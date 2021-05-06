
import { IonImg, IonLabel, IonTabBar, IonTabButton } from '@ionic/react';
import React from 'react';
import { SportsKind } from '../interfaces';
import { useSelector } from 'react-redux';

const SportsList: React.FC = () => {

  const sportsKindsList = useSelector( (state: {sportsKinds: SportsKind[]}) => state.sportsKinds );

  return (
    <IonTabBar style={{height: '70px', marginTop: '10px', border: 'none'}}>
      {
        sportsKindsList.map( item => (
          <IonTabButton key={item.code} tab={item.code}  href={`/sports/${item.code}`}>
            <IonImg style={{width: '48px', height: '48px'}} src={`/assets/icons/${item.icon}`} />
            <IonLabel>{item.name}</IonLabel>
          </IonTabButton>
        ))
      }
    </IonTabBar>
  );
};

export default SportsList;
