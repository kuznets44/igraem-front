import { IonContent, IonImg, IonItem, IonLabel, IonPage, IonProgressBar, IonRouterLink } from '@ionic/react';
import React, { useRef } from 'react';
import logo from '../assets/img/splash.jpg';
import { createUseStyles } from 'react-jss';


const useStyles = createUseStyles({
  splashLink: {
    position: 'absolute',
    top: '50%',
    marginTop: '-50%'
  },
  splashLabel: {
    textAlign: 'center',
    fontSize: '2rem!important',
    fontWeight: 'bold'
  }
});

const PageSplash: React.FC = () => {

  console.log('PageSplash');

  const css = useStyles();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRouterLink className={css.splashLink} routerLink="/sports">
          <IonImg src={logo} />
          <IonItem color="danger">
            <IonLabel className={css.splashLabel}>ИГРАЕМ!</IonLabel>
          </IonItem>
          <IonProgressBar color="danger" type="indeterminate"></IonProgressBar>
        </IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default PageSplash;
