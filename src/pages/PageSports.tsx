import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonItemDivider, IonList, IonPage, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import { add } from 'ionicons/icons';

import { GroupsListItem, SportsKind, User } from '../interfaces';

import GroupsList from '../components/GroupsList';
import SportsList from "../components/SportsList";
import { useHistory } from 'react-router-dom';


const PageSports: React.FC = () => { 

  const history = useHistory();

  const [searchText, setSearchText] = useState('');
  //const myGroups: GroupsListItem[] = mockGroupsList;

  const sportsKinds = useSelector( (state: {sportsKinds: SportsKind[]}) => state.sportsKinds );
  const myGroups = useSelector( (state:{ userData: User}) => {
    
    const list: GroupsListItem[] = [];
    
    state.userData.groups.forEach( itemGroup => {
      let listItem = {...itemGroup};
      listItem.sports = sportsKinds.find( item => item.code === itemGroup.sportskind_code )!;
      listItem.avatar = listItem.avatar !== '' ? listItem.avatar : 'no-group.svg';
      list.push(listItem);
    });

    return list;
  });

  console.log('myGroups',myGroups);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar color="white" placeholder="Поиск сообществ" value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
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
        { myGroups &&
          <GroupsList name="Мои сообщества" list={myGroups} />
        }

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/sports/addgroup')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default PageSports;
