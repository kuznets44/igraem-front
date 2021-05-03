import { IonContent, IonHeader, IonPage, IonProgressBar, IonSearchbar, IonText, IonToolbar } from '@ionic/react';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import GroupsList from '../components/GroupsList';

import { GroupsListItem, SportsKind, User } from '../interfaces';

const PageGroups: React.FC<{}> = (({}) : ReactElement => {

  const { code } = useParams<{code: string}>();

  const sportsKind = useSelector( (state: {sportsKinds: SportsKind[]}) => state.sportsKinds.find ( item => item.code === code) );
  const userData = useSelector( (state: {userData: User}) => state.userData );
  //const sportType = sportTypes.find( item => item.code === code)!;

  const [searchText, setSearchText] = useState('');
  const [ allGroups, setAllGroups ] = useState<GroupsListItem[]>([]);
  const [ myGroups, setMyGroups ] = useState<GroupsListItem[]>([]);

  useEffect(() => {
    (async () => {
      const responseResult = await axios( `${process.env.REACT_APP_API_URL}/groups/?sportskind=${code}`);
console.log('responseResult',responseResult);
      let list: GroupsListItem[] = [];
      responseResult.data.forEach( (itemGroup: GroupsListItem) => {
        let listItem = {...itemGroup};
        listItem.sports = sportsKind!;
        list.push(listItem);
      });

      setAllGroups(list);

      const myGroupsCodes = userData.groups.map ( item => item.code );
      setMyGroups(list.filter( item => myGroupsCodes.includes(item.code) ));
    })();
  },[]);

  if( allGroups.length === 0 ) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <IonProgressBar color="primary" type="indeterminate"></IonProgressBar>
        </IonContent>
      </IonPage>
    );
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonSearchbar color="white" placeholder={`${sportsKind!.name}: поиск сообществ`} value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <GroupsList name={`${sportsKind!.name}: мои сообщества`} list={myGroups} />

        <GroupsList name={`${sportsKind!.name}: все сообщества`} list={allGroups} />
      </IonContent>
    </IonPage>
  );
});

export default PageGroups;
