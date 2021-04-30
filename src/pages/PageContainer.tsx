import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
 } from '@ionic/react';

import { Route, Switch, useLocation } from 'react-router-dom';
 
import Tab2 from '../pages/Tab2';
import Tab3 from '../pages/Tab3';
import PageSplash from './PageSplash';
import PageSports from './PageSports';
import PageNotFound from './PageNotFound';
import PageGroups from './PageGroups';
import PageGroup from './PageGroup';
import PageEvent from './PageEvent';
import PageProfile from './PageProfile';


/*icons*/
import event from '../assets/img/icons/event.svg';
import group from '../assets/img/icons/group.svg';
import profile from '../assets/img/icons/profile.svg';



const PageContainer: React.FC = () => {

  const location = useLocation();
  console.log(location.pathname);
  const showTabs =location.pathname === '/' ? false : true;

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route path="/user-:userId">
            <PageProfile />
          </Route>
          <Route path="/sports/:code/:groupCode/event-:eventCode">
            <PageEvent />
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
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route exact path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <PageSplash />
          </Route>
          <Route path="**">
            <PageNotFound />
          </Route>
        </Switch>
        {/*
        */}
      </IonRouterOutlet>
      <IonTabBar color="primary" slot="bottom"  className={!showTabs ? "ion-hide": ""}>
        <IonTabButton tab="tabSports" href="/sports">
          <IonIcon icon={group} />
          <IonLabel>Сообщества</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tabEvents" href="/events">
          <IonIcon color="danger" icon={event} />
          <IonLabel>События</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tabProfile" href="/user-3">
          <IonIcon icon={profile} />
          <IonLabel>Профиль</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default PageContainer;
