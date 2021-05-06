import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonProgressBar, IonSearchbar, IonSelect, IonSelectOption, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { MouseEventHandler, ReactElement, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory, useParams } from 'react-router';
import { getTranslit } from '../utils';

import { EventsListItem, GroupsListItem, SportsKind, User } from '../interfaces';
import axios from 'axios';
import { useSelector } from 'react-redux';

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

const PageAddEvent: React.FC<{}> = (({}) : ReactElement => {

  const css = useStyles();
  const { code, groupCode } = useParams<{code: string, groupCode: string}>();
  const history = useHistory();

  const [ name, setName ] = useState<string>('');
  const [ participantsTotal, setParticipantsTotal ] = useState<number>(10);
  const [ dateStart, setDateStart ] = useState<string>(new Date().toLocaleString());
  const [ dateEnd, setDateEnd ] = useState<string>(new Date().toLocaleString());
  const [ country, setCountry ] = useState<string>('Россия');
  const [ city, setCity ] = useState<string>('');
  const [ address, setAddress ] = useState<string>('');
  const [ description, setDescription ] = useState<string>('');
  
  //current group data. We have to request it after the component is mounted
  const [ group, setGroup ] = useState<GroupsListItem>();
  useEffect(() => {
    (async () => {
      const responseResult = await axios.get( `${process.env.REACT_APP_API_URL}/groups/${groupCode}`);
      setGroup(responseResult.data);
    })();
  },[]);

  //select data from redux
  const sportsKinds = useSelector( (state: {sportsKinds: SportsKind[]}) => state.sportsKinds);
  const userData = useSelector( (state: {userData: User}) => state.userData);
  
  //refs for file input and image handling
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  //handler for avatar preview
  const handleFileChange = (e: any) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
      imgRef.current!.src = fileReader.result!.toString();
    }, false);

    fileReader.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = async () => {

    const formData = new FormData();

    const eventData = {
      name,
      code: getTranslit(name), 
      active: true,
      avatar: "",
      sports: sportsKinds.find( item => item.code === code),
      group: {
        code: group?.code,
        name: group?.name,
      },
      participantsTotal,
      dateStart: new Date(dateStart),
      dateEnd: new Date(dateEnd),
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
      ],
      posts: []
    };
    
    if(fileRef.current && fileRef.current?.files?.length) {
      formData.append("avatarFile",fileRef.current?.files[0]);
      eventData.avatar = fileRef.current?.files[0].name || '';
    }

    formData.append("data",JSON.stringify(eventData));

    const res = await axios.post(
      process.env.REACT_APP_API_URL + '/events',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    if( res.data ) {
      history.push(res.data.redirect);
    } 

    console.log(res);
  }
  
  let headerText = <>Новое событие</>;
  if(group) {
    headerText = <>{group.name}: новое событие</>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton style={ {display: 'block' } } color="primary" />
            <IonTitle>{ headerText}</IonTitle>
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
              <IonLabel color="primary" position="floating">Количество участников</IonLabel>
              <IonInput value={participantsTotal} type="number" onIonChange={e => setParticipantsTotal(parseInt(e.detail.value!))}></IonInput>
            </IonItem>  
          </IonList>
        </IonItem>

        <IonItem lines="none">
          <IonLabel>
            <h1><b>Дата и время</b></h1>
          </IonLabel>
        </IonItem>
        <IonItem>
            <IonLabel color="primary" position="floating">Начало</IonLabel>
            <IonDatetime  displayFormat="D MMM YYYY H:mm"
                          min="2021" max="2025" value={dateStart} onIonChange={e => setDateStart(e.detail.value!)}>
            </IonDatetime>
        </IonItem>
        <IonItem>
            <IonLabel color="primary" position="floating">Окончание</IonLabel>
            <IonDatetime  displayFormat="D MMM YYYY H:mm"
                          min="2021" max="2025" value={dateEnd} onIonChange={e => setDateEnd(e.detail.value!)}>
            </IonDatetime>
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

        <IonButton color="primary" class={css.submitButton} onClick={handleSubmit} className="ion-padding-horizontal">
          СОЗДАТЬ
        </IonButton>
      </IonContent>
    </IonPage>
  );
});

export default PageAddEvent;
