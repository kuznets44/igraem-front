import { IonContent, IonPage, IonText } from '@ionic/react';
import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  textMiddle: {
    position: 'absolute',
    top: 'calc(50% - 56px)',
    textAlign: 'center',
    width: '100%'
  },
});

const PageNotFound: React.FC = () => {

  const css = useStyles();

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonText color="primary" class={css.textMiddle}>
            <h3>404 Page Not Found</h3>
          </IonText>
      </IonContent>
    </IonPage>
  );
};

export default PageNotFound;
