import { IonContent, IonHeader, IonItem, IonItemDivider, IonList, IonPage, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import SportsList from "../components/SportsList";
import { mockGroupsList } from "../data/groupsList";
import { GroupsListItem } from '../interfaces';

import GroupsList from '../components/GroupsList';


const PageSports: React.FC = () => {

  const [searchText, setSearchText] = useState('');
  const myGroups: GroupsListItem[] = mockGroupsList;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar class="ion-margin-top" color="white" placeholder="Поиск сообществ" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <IonList class="ion-padding-bottom">
          <IonItem lines="none">
            <IonText color="primary">
              <h3>По видам спорта</h3>
            </IonText>
          </IonItem>
          <SportsList />
        </IonList>
        
        <IonItemDivider></IonItemDivider>

        <GroupsList name="Мои сообщества" list={myGroups} />
      </IonContent>
    </IonPage>
  );
};

export default PageSports;
