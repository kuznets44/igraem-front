import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import React, { ReactElement, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { mockEventsList } from '../data/eventsList';
import { users } from '../data/userData';
import { getPlural } from '../utils';
import PostsList from '../components/PostsList';


import iconPlace from '../assets/img/icons/place.svg';
import iconGroup from '../assets/img/icons/group_list.svg';
import iconTime from '../assets/img/icons/time.svg';
import iconInfo from '../assets/img/icons/info.svg';

import { EventsListItem, GroupsListItem, User } from '../interfaces';
import EventsList from '../components/EventsList';
import { mockGroupsList } from '../data/groupsList';

const useStyles = createUseStyles({
  maxAvatar: {
    position:'relative',
    marginRight: '0',
    border: '1px solid #ffffff',
    width: '96px',
    height: '96px',
    display: 'inline-block'
  },
  icon: {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    marginLeft: '-4px'
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

const PageProfile: React.FC<{}> = (({}) : ReactElement => {

  const css = useStyles();
  const { userId } = useParams<{userId: string}>();

  const user: User = users.find( item => item.id === parseInt(userId))!;
  const userEvents: EventsListItem[] = mockEventsList.filter( item => user.events.includes(item.code));
  const userGroups: GroupsListItem[] = mockGroupsList.filter( item => user.groups.includes(item.code));
  
  return (
    <IonPage>
      <IonContent>
        <IonItem lines="none">
          <IonAvatar className={css.maxAvatar} slot="start">
                <img src={`/assets/images/users/${user.avatar}`} />
              </IonAvatar> 
          <IonLabel>
            <h1 className="ion-padding-start"><b>{user.name}</b></h1>
            <IonList>
              <IonItem lines="none" class="ion-no-margin">
                <IonIcon class={css.icon} slot="start" color="primary" icon={iconPlace} />
                <IonLabel color="primary">
                  <p>{[user.country,user.city].join(', ')}</p>
                </IonLabel>
              </IonItem>
              <IonItem lines="none">
                <IonIcon class={css.icon} slot="start" color="primary" icon={iconGroup} />
                <IonLabel color="primary">
                  <p>{getPlural(user.groups.length,['сообщество','сообщества','сообществ'])}</p>
                </IonLabel>
                <IonItemGroup slot="end">
                {
                  userGroups.slice(0,4).map( (item, index) =>
                  <IonAvatar className={css.miniAvatar} key={index}>
                    <img src={`/assets/images/groups/${item.avatar}`} />
                  </IonAvatar> 
                  )
                }
              </IonItemGroup>
              </IonItem>
            </IonList>
          </IonLabel>
        </IonItem>

        <IonItemDivider></IonItemDivider>
        <IonItem lines="full">
          <h3>СОБЫТИЯ</h3>
        </IonItem>
        <EventsList list={userEvents} />
      </IonContent>
    </IonPage>
  );
});

export default PageProfile;
