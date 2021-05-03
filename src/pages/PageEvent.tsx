import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonProgressBar, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import React, { ReactElement, useEffect, useState } from 'react';
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

  const [ event, setEvent ] = useState<any>({});
  const [ isUserInEvent, setIsUserInEvent ] = useState(false);

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
      <IonContent>
        <div className={css.topContainer} style={ {backgroundImage: `url(/assets/images/events/${event.avatar}`} }></div>
        <IonItem lines="none">
          <IonLabel>
            <h2><b>{event.name}</b></h2>
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
                <img src={`/assets/images/users/${item.avatar}`} />
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
      </IonContent>
    </IonPage>
  );
});

export default PageEvent;
