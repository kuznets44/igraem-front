
import { IonAvatar, IonItem, IonLabel, IonList, IonListHeader, IonRouterLink, IonText } from '@ionic/react';
import React, { ReactElement } from 'react';
import { EventsListItem } from '../interfaces';
import { getPlural } from '../utils';

const EventsList: React.FC<{list: EventsListItem[]}> = (({list}) : ReactElement => {

    
  const listOut  = list.map( item => (
    <IonItem  routerLink={`/sports/${item.sports.code}/${item.group.code}/event-${item.code}`}
              key={item.code}
    >
      <IonAvatar slot="start">
        <img src={`/assets/images/events/${item.avatar}`} />
      </IonAvatar>
      <IonLabel>
        <h2>{item.name}</h2>
        <p color="primary">{`${item.date} c ${item.timeStart} до ${item.timeEnd}`}</p>
        <p>{`${item.participants.current} / ${getPlural(item.participants.total,['участник','участника','участников'])}`}</p>
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
