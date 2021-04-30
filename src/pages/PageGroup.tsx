import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { mockGroupsList } from '../data/groupsList';
import { mockEventsList } from '../data/eventsList';
import { users } from '../data/userData';
import { getPlural } from '../utils';

import EventsList from '../components/EventsList';

import place from '../assets/img/icons/place.svg';
import info from '../assets/img/icons/info.svg';
import { EventsListItem } from '../interfaces';

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
    width: '36px',
    height: '36px',
    display: 'inline-block'
  }
});

const PageGroup: React.FC<{}> = (({}) : ReactElement => {

  const css = useStyles();
  const { code, groupCode } = useParams<{code: string, groupCode: string}>();

  const group = mockGroupsList.find( item => item.code === groupCode)!;
  const participants = users.filter( item => item.groups.includes(groupCode) );

  const eventsList: EventsListItem[] = mockEventsList.filter( item => item.group.code === groupCode);
  
  return (
    <IonPage>
      <IonContent>
        <div className={css.topContainer} style={ {backgroundImage: `url(/assets/images/groups/${group.avatar}`} }></div>
        <IonItem>
          <IonLabel>
            <h2><b>{group.name}</b></h2>
            <p>{[group.sports.name, group.city].join(', ')} | <b>{ getPlural(participants.length,['участник','участника','участников']) }</b></p>
          </IonLabel>
        </IonItem>
        <IonItemGroup class="ion-padding">
          {
            participants.slice(0,10).map( (item, index) =>
             <IonAvatar className={css.miniAvatar} key={index}>
               <img src={`/assets/images/users/${item.avatar}`} />
             </IonAvatar> 
            )
          }
        </IonItemGroup>
        <IonButton class="ion-padding-horizontal" style={ { width: "100%"} }>Покинуть сообщество</IonButton>
        <IonList lines="none">
          <IonItem>
            <IonIcon slot="start" color="primary" icon={place} />
            <IonLabel color="primary">
              <p>{group.address}</p>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" color="primary" icon={info} />
            <IonLabel color="primary">
              <p><b>Подробная информация</b></p>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonItemDivider></IonItemDivider>
        <IonItem>
          <h3>СОБЫТИЯ</h3>
        </IonItem>
        <EventsList list={eventsList} />
      </IonContent>
    </IonPage>
  );
});

export default PageGroup;
