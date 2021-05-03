import { IonContent, IonImg, IonItem, IonLabel, IonPage, IonProgressBar, IonRouterLink } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import logo from '../assets/img/splash.jpg';
//import logo from '../assets/img/splash_data_uri.jpeg';
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
  },
  splashImage: {
    width: '425px',
    height: '247px'
  }
});

const PageSplash: React.FC = () => {

  console.log('PageSplash');

  const css = useStyles();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonRouterLink className={css.splashLink} routerLink="/sports">
          <IonImg src={logo} class={css.splashImage} />
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
