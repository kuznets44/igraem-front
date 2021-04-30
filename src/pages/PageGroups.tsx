import { IonContent, IonHeader, IonPage, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import React, { ReactElement, useState } from 'react';
import { useParams } from 'react-router';
import GroupsList from '../components/GroupsList';
import { mockGroupsList } from '../data/groupsList';
import { sports } from '../data/sports';
import { userData } from '../data/userData';
import { GroupsListItem, SportType } from '../interfaces';

const PageGroups: React.FC<{}> = (({}) : ReactElement => {

  const { code } = useParams<{code: string}>();

  const sportTypes: SportType[] = sports;
  const sportType = sportTypes.find( item => item.code === code)!;

  const [searchText, setSearchText] = useState('');

  const allGroups: GroupsListItem[] = mockGroupsList.filter( item => item.sports.code === sportType.code);
  const myGroups: GroupsListItem[] = allGroups.filter( item => userData.groups.includes(item.code));
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar class="ion-margin-top" color="white" placeholder={`${sportType.name}: поиск сообществ`} value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      
      <IonContent class="ion-padding-horizontal">
        <GroupsList name={`${sportType.name}: мои сообщества`} list={myGroups} />

        <GroupsList name={`${sportType.name}: все сообщества`} list={allGroups} />
      </IonContent>
    </IonPage>
  );
});

export default PageGroups;
