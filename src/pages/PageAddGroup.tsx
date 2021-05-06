import { 
  IonAvatar,
  IonBackButton, 
  IonButton, 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonPage, 
  IonSelect, 
  IonSelectOption, 
  IonTextarea, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';
import React, { ReactElement, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { getTranslit } from '../utils';
import { GroupsListItem, SportsKind, User } from '../interfaces';
import { addUserGroup } from '../store';

const useStyles = createUseStyles({
  submitButton: {
    width: '100%',
    position: 'absolute',
    bottom: '20px'
  },
  maxAvatar: {
    position:'relative',
    marginRight: '20px',
    border: '1px solid #ffffff',
    width: '96px',
    height: '96px',
    display: 'inline-block',
  },
  fileInput: {
    position:'absolute',
    display: 'block',
    width: '100%',
    height: '100%',
    top: 0,
    opacity: 0
  }
});

const PageAddGroup: React.FC<{}> = (({}) : ReactElement => {


  const css = useStyles();
  const { code } = useParams<{code: string}>();
  const history = useHistory();
  const dispatch = useDispatch();

  const [ name, setName ] = useState<string>('');
  const [ sports, setSports ] = useState<string>('hockey');
  const [ country, setCountry ] = useState<string>('Россия');
  const [ city, setCity ] = useState<string>('');
  const [ address, setAddress ] = useState<string>('');
  const [ description, setDescription ] = useState<string>('');

  const sportsKinds = useSelector( (state: {sportsKinds: SportsKind[]}) => state.sportsKinds);
  const userData = useSelector( (state: {userData: User}) => state.userData);
  
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);


  const handleFileChange = (e: any) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      imgRef.current!.src = fileReader.result!.toString();
    }, false);

    fileReader.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = async () => {

    const formData = new FormData();
    const groupData: GroupsListItem = {
      name,
      code: getTranslit(name), 
      sports: sportsKinds.find( item => item.code === sports)!,
      sportskind_code: sportsKinds.find( item => item.code === sports)!.code,
      avatar: "",
      active: true,
      country,
      city,
      address,
      description,
      createdBy: userData.code,
      createdAt: new Date(),
      participants: [
        {
          code: userData.code,
          name: userData.name,
          lastName: userData.lastName,
          avatar: userData.avatar
        }
      ]
    };
    
    console.log(fileRef.current);
    if(fileRef.current && fileRef.current?.files) {
      formData.append("avatarFile",fileRef.current?.files[0]);
      groupData.avatar = fileRef.current?.files[0].name;
    }

    formData.append("data",JSON.stringify(groupData));

    const res = await axios.post(
      process.env.REACT_APP_API_URL + '/groups',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    if( res.data ) {
      dispatch(addUserGroup(groupData));
      history.push(res.data.redirect);
    } 
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton style={ {display: 'block' } } color="primary" />
            <IonTitle>Новое сообщество</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem lines="none">
          <IonAvatar className={css.maxAvatar} slot="start">
            <img ref={imgRef} src={'/assets/icons/image_upload.svg'} />
            <input type="file" className={css.fileInput} ref={fileRef} onChange={handleFileChange} />
          </IonAvatar>
          <IonList style={{ width: '100%'}}>
            <IonItem>
              <IonLabel color="primary" position="floating">Название</IonLabel>
              <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel color="primary" position="floating">Вид спорта</IonLabel>
              <IonSelect value={sports} placeholder="Выберите" onIonChange={e => setSports(e.detail.value!)}>
                <IonSelectOption value="hockey">Хоккей</IonSelectOption>
                <IonSelectOption value="football">Футбол</IonSelectOption>
              </IonSelect>
            </IonItem>  
          </IonList>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>
            <h1><b>Местоположение</b></h1>
          </IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel color="primary" position="floating">Страна</IonLabel>
            <IonInput value={country} onIonChange={e => setCountry(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel color="primary" position="floating">Город</IonLabel>
            <IonInput value={city} onIonChange={e => setCity(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
            <IonLabel color="primary" position="floating">Адрес</IonLabel>
            <IonTextarea autoGrow value={address} onIonChange={e => setAddress(e.detail.value!)}></IonTextarea>
        </IonItem>
        <IonItem>
            <IonLabel color="primary" position="floating">Информация</IonLabel>
            <IonTextarea autoGrow value={description} onIonChange={e => setDescription(e.detail.value!)}></IonTextarea>
        </IonItem>

        <IonButton class={css.submitButton} onClick={handleSubmit} className="ion-padding-horizontal">
          СОЗДАТЬ
        </IonButton>
      </IonContent>
    </IonPage>
  );
});

export default PageAddGroup;
