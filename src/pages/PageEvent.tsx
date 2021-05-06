import { IonAvatar, IonBackButton, IonButton, IonButtons, IonContent, IonFabButton, IonFooter, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonProgressBar, IonSearchbar, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { MouseEventHandler, ReactElement, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { mockEventsList } from '../data/eventsList';
import { users } from '../data/userData';
import { getPlural, getEventDateString } from '../utils';
import PostsList from '../components/PostsList';


import iconPlace from '../assets/img/icons/place.svg';
import iconGroup from '../assets/img/icons/group_list.svg';
import iconTime from '../assets/img/icons/time.svg';
import iconInfo from '../assets/img/icons/info.svg';
import iconSend from '../assets/img/icons/send.svg';

import { EventsListItem, User } from '../interfaces';
import axios from 'axios';
import { useSelector } from 'react-redux';

const useStyles = createUseStyles({
  topContainer: {
    height: '200px',
    backgroundSize: '100% auto',
    backgroundPosition: 'left top'
  },
  miniAvatar: {
    position:'relative',
    marginRight: '-10px',
    border: '1px solid #ffffff',
    width: '24px',
    height: '24px',
    display: 'inline-block'
  }
});

const PageEvent: React.FC<{}> = (({}) : ReactElement => {

  const css = useStyles();
  const { eventCode } = useParams<{code: string, groupCode: string, eventCode: string}>();
  const userData = useSelector( (state: {userData: User}) => state.userData );

  const postsEndRef = useRef(null);

  const [ event, setEvent ] = useState<any>({});
  const [ isUserInEvent, setIsUserInEvent ] = useState(false);

  const [ postText, setPostText ] = useState('');

  const handlePostButton = (e: any) => {
    const newEvent = {...event};
    newEvent.posts.push({
      createdAt: new Date().toLocaleString(),
      by: {
        name: userData.name,
        lastName: userData.lastName,
        code: userData.code,
        avatar: userData.avatar,
      },
      text: postText
    });
    setEvent(newEvent);
    setPostText('');
  }

  useEffect(() => {
    (async () => {
      const responseResult = await axios( `${process.env.REACT_APP_API_URL}/events/${eventCode}`);
      const eventData = responseResult.data;
      setEvent(eventData);
console.log('event data',eventData);
      eventData.participants.forEach( (item: User) => {
        if( item.code === userData.code ) {
          setIsUserInEvent(true);
          return;
        }
      });
    })();
  },[]);

  useEffect(() => {
    document.querySelector("ion-content")?.scrollToBottom();
  },[postText]);

  if( event.name === undefined ) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonProgressBar color="primary" type="indeterminate"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton style={ {display: 'block' } } color="primary" />
            <IonTitle>{event.name}</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        { event.avatar &&
          <div className={css.topContainer} style={ {backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/images/events/${event.avatar}`} }></div>
        }
        <IonItem lines="none">
          <IonLabel>
            <p>{event.sports.name} | <b>Сообщество {event.group.name}</b></p>
          </IonLabel>
        </IonItem>

        <IonButton class="ion-padding-horizontal" style={ { width: "100%"} }>
          { isUserInEvent ? 'Отказаться от участия' : 'Хочу участвовать' }
        </IonButton>
        
        <IonList lines="none">
          <IonItem>
            <IonIcon slot="start" color="primary" icon={iconGroup} />
            <IonLabel color="primary">
              <p>{event.participants.length} / {getPlural(event.participantsTotal,['участник','участника','участников'])}</p>
            </IonLabel>
            <IonItemGroup class="ion-padding" slot="end">
            {
              event.participants.slice(0,4).map( (item: User, index: number) =>
              <IonAvatar className={css.miniAvatar} key={index}>
                <img src={`${process.env.REACT_APP_PUBLIC_URL}/images/users/${item.avatar || 'no-user.svg'}`} />
              </IonAvatar> 
              )
            }
          </IonItemGroup>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="primary" icon={iconPlace} />
            <IonLabel color="primary">
              <p>{event.address}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="primary" icon={iconTime} />
            <IonLabel color="primary">
              <p>{getEventDateString(event)}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="primary" icon={iconInfo} />
            <IonLabel color="primary">
              <p><b>Подробная информация</b></p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonItemDivider></IonItemDivider>
        <IonItem lines="full">
          <h3>СООБЩЕНИЯ</h3>
        </IonItem>
        <PostsList list={event.posts} />
        <div id="postsEnd" />
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonToolbar>
          <IonInput placeholder="Сообщение" value={postText} style={ {width: '100%'} } onIonChange={e => setPostText(e.detail.value!)} />
          <IonFabButton slot="end"  size="small" onClick={handlePostButton}>
            <IonIcon color="white" icon={iconSend} />
          </IonFabButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
});

export default PageEvent;
