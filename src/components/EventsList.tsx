
import { IonAvatar, IonItem, IonLabel, IonList, IonListHeader, IonRouterLink, IonText } from '@ionic/react';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { EventsListItem } from '../interfaces';
import { getEventDateString, getPlural } from '../utils';

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
