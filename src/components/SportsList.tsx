
import { IonBadge, IonIcon, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { sports } from '../data/sports';

const SportsList: React.FC = () => {
  const sportsList  = sports.map( item => (
    <IonTabButton key={item.code} tab={item.code}  href={`/sports/${item.code}`}>
      <IonImg style={{width: '48px', height: '48px'}} src={`/assets/icon/${item.image}`} />
      <IonLabel>{item.name}</IonLabel>
    </IonTabButton>
  ));
  
  return (
    <IonTabBar style={{height: '64px', marginTop: '10px', border: 'none'}}>
      {sportsList}
    </IonTabBar>
  );
};

export default SportsList;
