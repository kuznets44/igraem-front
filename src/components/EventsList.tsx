
import { IonAvatar, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { ReactElement } from 'react';
import { EventsListItem } from '../interfaces';
import { getEventDateString, getPlural } from '../utils';

const EventsList: React.FC<{list: EventsListItem[]}> = (({list}) : ReactElement => {

  const listOut  = list.map( item => (
    <IonItem  routerLink={`/sports/${item.sports.code}/${item.group.code}/event-${item.code}`}
              key={item.code}
    >
      <IonAvatar slot="start">
        <img src={`${process.env.REACT_APP_PUBLIC_URL}/images/events/${item.avatar || 'no-event.svg'}`} />
      </IonAvatar>
      <IonLabel>
        <h2>{item.name}</h2>
        <p color="primary">{getEventDateString(item)}</p>
        <p>{`${item.participants.length} / ${getPlural(item.participantsTotal,['участник','участника','участников'])}`}</p>
      </IonLabel>
    </IonItem>
  ));
  
  return (
    <>
      <IonList>
        {listOut}
      </IonList>
    </>
  );
});

export default EventsList;
