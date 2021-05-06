import { 
  IonAvatar, 
  IonContent, 
  IonIcon, 
  IonItem, 
  IonItemDivider, 
  IonItemGroup, 
  IonLabel, 
  IonList, 
  IonPage
} from '@ionic/react';
import React, { ReactElement, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { getPlural } from '../utils';
import { EventsListItem, User } from '../interfaces';

import EventsList from '../components/EventsList';

//icons
import iconPlace from '../assets/img/icons/place.svg';
import iconGroup from '../assets/img/icons/group_list.svg';

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

  const user = useSelector( (state: { userData: User})=> state.userData);

  //fetch user events list
  const [ eventsList, setEventsList ] = useState<EventsListItem[]>([]);
  useEffect(() => {
    (async () => {
      const responseResult = await axios.get( `${process.env.REACT_APP_API_URL}/events/`,{params: {code:user.events}});
      setEventsList(responseResult.data);
    })();
  },[]);

  
  return (
    <IonPage>
      <IonContent>
        <IonItem lines="none">
          <IonAvatar className={css.maxAvatar} slot="start">
            <img src={`${process.env.REACT_APP_PUBLIC_URL}/images/users/${user.avatar || 'no-user.svg'}`} />
          </IonAvatar> 
          <IonLabel>
            <h1 className="ion-padding-start"><b>{[user.name,user.lastName].join(' ')}</b></h1>
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
                  user.groups.slice(0,4).map( (item, index) =>
                  <IonAvatar className={css.miniAvatar} key={index}>
                    <img src={`${process.env.REACT_APP_PUBLIC_URL}/images/groups/${item.avatar || 'no-group.svg'}`} />
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
        <EventsList list={eventsList} />
      </IonContent>
    </IonPage>
  );
});

export default PageProfile;
