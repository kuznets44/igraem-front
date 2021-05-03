import { IonContent, IonItem, IonPage, IonText } from '@ionic/react';
import React, { ReactElement, useEffect, useState } from 'react';


import { EventsListItem, GroupsListItem, User } from '../interfaces';
import EventsList from '../components/EventsList';
import { useSelector } from 'react-redux';
import axios from 'axios';

const PageMyEvents: React.FC<{}> = (({}) : ReactElement => {

  const user = useSelector( (state: { userData: User})=> state.userData);
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
        <IonItem lines="full">
          <IonText color="primary">
              <h3>Мои события</h3>
          </IonText>
        </IonItem>
        <EventsList list={eventsList} />
      </IonContent>
    </IonPage>
  );
});

export default PageMyEvents;
