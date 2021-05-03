
import { IonAvatar, IonItem, IonLabel, IonList, IonListHeader, IonRouterLink, IonText } from '@ionic/react';
import React, { ReactElement } from 'react';
import { GroupsListItem } from '../interfaces';

const GroupsList: React.FC<{name: string, list: GroupsListItem[]}> = (({name,list}) : ReactElement => {
  
  if( list === undefined) {
    return (<></>);
  }
  const listOut  = list.map( item => (
    <IonItem  routerLink={`/sports/${item.sports.code}/${item.code}`}
              key={item.code}
    >
      <IonAvatar slot="start">
        <img src={`/assets/images/groups/${item.avatar}`} />
      </IonAvatar>
      <IonLabel>
        <h2>{item.name}</h2>
        <p>{[item.sports.name, item.city].join(', ')}</p>
      </IonLabel>
    </IonItem>
  ));
  
  return (
    <>
      <IonText color="primary">
        <h3  className="ion-padding-horizontal">{name} {list.length}</h3>
      </IonText>
      <IonList class="ion-padding-horizontal" >
        {listOut}
      </IonList>
    </>
  );
});

export default GroupsList;
