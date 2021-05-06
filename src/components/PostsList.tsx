
import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonItemGroup, IonLabel, IonList, IonListHeader, IonRouterLink, IonText } from '@ionic/react';
import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { Post } from '../interfaces';

import iconLike from '../assets/img/icons/like.svg';
import iconShare from '../assets/img/icons/share.svg';

const useStyles = createUseStyles({
  cardTitle: {
    fontSize: '16px',
  },
});

const PostsList: React.FC<{list: Post[]}> = (({list}) : ReactElement => {

  const css = useStyles();
    
  let listOut = [<></>];

  if(list) {
    listOut  = list.map( (item: Post, index: number) => (
      <IonCard key={index} class="ion-no-margin">
        <IonCardHeader>
          <IonItem lines="full" class="ion-no-padding" routerLink={`/user-${item.by.id}`}>
            <IonAvatar slot="start">
              <img src={`${process.env.REACT_APP_PUBLIC_URL}/images/users/${item.by.avatar}`} />
            </IonAvatar>
            <IonLabel>
              <IonCardTitle color="primary" class={css.cardTitle}>{item.by.name}</IonCardTitle>
              <IonCardSubtitle>{item.createdAt}</IonCardSubtitle>
            </IonLabel>
            <IonItemGroup class="ion-no-margin" slot="end">
              <IonIcon class="ion-margin-start" icon={iconLike} />
              <IonIcon class="ion-margin-start" icon={iconShare} />
            </IonItemGroup>
          </IonItem>
        </IonCardHeader>
  
        <IonCardContent>
          {item.text}
        </IonCardContent>
      </IonCard>
    ));  
  }
  
  return (
    <>
      <IonList>
        {listOut}
      </IonList>
    </>
  );
});

export default PostsList;
