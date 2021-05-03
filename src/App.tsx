import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { createUseStyles, ThemeProvider } from 'react-jss';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';

/* Page container */
import PageContainer from './pages/PageContainer';

/* store */
import { store } from './store';
import { Provider } from 'react-redux';

const useTheme = createUseStyles({});
const App: React.FC = () => {

  const theme = useTheme();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <IonApp>
          <IonReactRouter>
            <PageContainer />
          </IonReactRouter>
        </IonApp>
      </ThemeProvider>
    </Provider>
  )
};

export default App;
