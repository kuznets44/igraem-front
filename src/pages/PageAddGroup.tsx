import { IonAvatar, IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonProgressBar, IonSearchbar, IonSelect, IonSelectOption, IonText, IonTextarea, IonToolbar } from '@ionic/react';
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
  miniAvatar: {
    position:'relative',
    marginRight: '-10px',
    border: '1px solid #ffffff',
    width: '36px',
    height: '36px',
    display: 'inline-block'
  }
});

const PageAddGroup: React.FC<{}> = (({}) : ReactElement => {

  const css = useStyles();
  const { code } = useParams<{code: string}>();
  const history = useHistory();

  const [ name, setName ] = useState<string>('');
  const [ sports, setSports ] = useState<string>('hockey');
  const [ country, setCountry ] = useState<string>('Россия');
  const [ city, setCity ] = useState<string>('');
  const [ address, setAddress ] = useState<string>('');
  const [ description, setDescription ] = useState<string>('');

  const sportsKinds = useSelector( (state: {sportsKinds: SportsKind[]}) => state.sportsKinds);
  const userData = useSelector( (state: {userData: User}) => state.userData);
  
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {


    const formData = new FormData();

    console.log('sportsKinds',sportsKinds);

    const groupData = {
      name,
      code: getTranslit(name), 
      sports: sportsKinds.find( item => item.code === sports),
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

    console.log('formData',formData);
    
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
      history.push(res.data.redirect);
    } 

    console.log(res);
  }
  
  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonLabel>
            <h1><b>Новое сообщество</b></h1>
          </IonLabel>
        </IonItem>
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
        <input type="file" ref={fileRef} />
        <IonItem>
          <IonLabel>
            <h2><b>Местоположение</b></h2>
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
