export const mockEventsList = [
  {
    code: 'trenirovka-dinamo',
    name: 'Тренировка, стадион "Динамо"',
    avatar: 'event-1.jpg',
    sports: {
      code: 'hockey',
      name: 'Хоккей'
    },
    group: {
      code: 'hockey-v-bryanske',
      name: 'Хоккей в Брянске',
    },
    participants: {
      current: 5,
      total: 10
    },
    address: 'Брянск, ул. Бежицкая, 1',
    date: '15 мая 2021 г.',
    timeStart: '19:00',
    timeEnd: '21:00',
    posts: [
      {
        id:1,
        by: {
          id: 1,
          name: 'Jon Smith',
          avatar: 'john-smith.jpg',
        },
        date: '21.04.2021 19:35',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dui nisi, pellentesque vel volutpat eget, porttitor nec velit. Ut porta lobortis elit, ut interdum augue sollicitudin sit amet. Vivamus dictum urna sagittis sapien vestibulum, at malesuada odio feugiat. Cras posuere nec enim eget posuere. Praesent iaculis sem a diam convallis, quis rhoncus urna mollis. Cras laoreet felis id eleifend pretium. Fusce in leo metus. In tristique eros quis metus condimentum bibendum. Mauris et convallis justo. Proin a pharetra magna, in convallis justo. Mauris placerat lobortis rutrum. Quisque lobortis et enim ut luctus.'
      },
      {
        id:2,
        by: {
          id: 2,
          name: 'Max Kuznetsov',
          avatar: 'max-kuznetsov.jpg',
        },
        date: '22.04.2021 10:56',
        text: 'Praesent ullamcorper nisi at justo tincidunt, eget congue velit pellentesque. Donec maximus aliquet nunc eu vulputate. Sed ac rhoncus risus. Nullam auctor viverra elit, rutrum fermentum nunc elementum at. Mauris arcu turpis, viverra vel sapien pulvinar, mattis cursus est. Cras quis elementum ipsum. Etiam euismod tempor rhoncus. Sed luctus vulputate lobortis. Mauris pharetra arcu quis massa fermentum, quis cursus lectus porta. Curabitur tincidunt, ligula ut dignissim cursus, ante lorem pharetra ante, non malesuada ante lacus vitae turpis.'
      },
      {
        id:3,
        by: {
          id: 3,
          name: 'Дмитрий Кузнецов',
          avatar: 'dmitrii-kuznetsov.jpg',
        },
        date: '30.04.2021 19:35',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dui nisi, pellentesque vel volutpat eget, porttitor nec velit. Ut porta lobortis elit, ut interdum augue sollicitudin sit amet. Vivamus dictum urna sagittis sapien vestibulum, at malesuada odio feugiat. Cras posuere nec enim eget posuere. Praesent iaculis sem a diam convallis, quis rhoncus urna mollis. Cras laoreet felis id eleifend pretium. Fusce in leo metus. In tristique eros quis metus condimentum bibendum. Mauris et convallis justo. Proin a pharetra magna, in convallis justo. Mauris placerat lobortis rutrum. Quisque lobortis et enim ut luctus.'
      },
    ]
  },
  {
    code: 'igra0-desna',
    name: 'Игра, стадион "Десна"',
    avatar: 'event-2.jpg',
    sports: {
      code: 'hockey',
      name: 'Хоккей'
    },
    group: {
      code: 'hockey-v-bryanske',
      name: 'Хоккей в Брянске',
    },
    participants: {
      current: 18,
      total: 24
    },
    address: 'Брянск, ул. Бежицкая, 1',
    date: '20 мая 2021 г.',
    timeStart: '21:00',
    timeEnd: '23:00',
    posts: []
  },
  {
    code: 'trenirovka-dinamo-1',
    name: 'Тренировка, стадион "Динамо"',
    avatar: 'event-1.jpg',
    sports: {
      code: 'hockey',
      name: 'Хоккей'
    },
    group: {
      code: 'hockey-v-bryanske',
      name: 'Хоккей в Брянске',
    },
    participants: {
      current: 0,
      total: 10
    },
    address: 'Брянск, ул. Бежицкая, 1',
    date: '22 мая 2021 г.',
    timeStart: '18:00',
    timeEnd: '20:00',
    posts: []
  },  
  {
    code: 'igra0-desna-2',
    name: 'Игра, стадион "Десна"',
    avatar: 'event-2.jpg',
    sports: {
      code: 'hockey',
      name: 'Хоккей'
    },
    address: 'Брянск, ул. Бежицкая, 1',
    group: {
      code: 'hockey-v-bryanske',
      name: 'Хоккей в Брянске',
    },
    participants: {
      current: 10,
      total: 24
    },
    date: '25 мая 2021 г.',
    timeStart: '21:00',
    timeEnd: '23:00',
    posts: []
  },
];