import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
 } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInitialData } from '../store';


//pages components
import PageSplash from './PageSplash';
import PageSports from './PageSports';
import PageNotFound from './PageNotFound';
import PageGroups from './PageGroups';
import PageGroup from './PageGroup';
import PageEvent from './PageEvent';
import PageProfile from './PageProfile';
import PageMyEvents from './PageMyEvents';
import PageAddGroup from './PageAddGroup';
import PageAddEvent from './PageAddEvent';

//icons
import event from '../assets/img/icons/event.svg';
import group from '../assets/img/icons/group.svg';
import profile from '../assets/img/icons/profile.svg';

import { User } from '../interfaces';

const PageContainer: React.FC = () => {

  const dataIsLoaded = useSelector( (state: {dataIsLoaded: boolean}) => state.dataIsLoaded);
  const userData = useSelector( (state:{userData:User}) => state.userData );

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(fetchInitialData()), 1000);
  },[]);

  if( !dataIsLoaded ) {
    return (
      <PageSplash />
    );
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route path="/user-:userId">
            <PageProfile />
          </Route>
          <Route path="/sports/:code/:groupCode/addevent">
            <PageAddEvent />
          </Route>
          <Route path="/sports/:code/:groupCode/event-:eventCode">
            <PageEvent />
          </Route>
          <Route path="/sports/addgroup">
            <PageAddGroup />
          </Route>
          <Route path="/sports/:code/addgroup">
            <PageAddGroup />
          </Route>
          <Route path="/sports/:code/:groupCode">
            <PageGroup />
          </Route>
          <Route path="/sports/:code">
            <PageGroups />
          </Route>
          <Route exact path="/sports">
            <PageSports />
          </Route>
          <Route exact path="/myevents">
            <PageMyEvents />
          </Route>
          <Route exact path="/">
            <Redirect to="/sports" />
          </Route>
          <Route path="**">
            <PageNotFound />
          </Route>
        </Switch>
      </IonRouterOutlet>
      <IonTabBar color="primary" slot="bottom">
        <IonTabButton tab="tabSports" href="/sports">
          <IonIcon icon={group} />
          <IonLabel>Сообщества</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tabEvents" href="/myevents">
          <IonIcon color="danger" icon={event} />
          <IonLabel>События</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tabProfile" href={`/user-${userData.code}`}>
          <IonIcon icon={profile} />
          <IonLabel>Профиль</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default PageContainer;
