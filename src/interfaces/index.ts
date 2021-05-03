export interface GroupsListItem {
  code: string,
  name: string,
  avatar: string,
  sportskind_code: string,
  sports: {
    code: string,
    name: string
  },
  city?: string,
  images?: string[]
}

export interface Post {
  by: {
    id: number,
    name: string,
    avatar: string
  },
  createdAt: string,
  text: string
}

export interface User {
  id: number,
  name: string,
  lastName: string,
  secondName: string,
  code: string,
  avatar: string,
  country: string,
  city: string,
  groups: GroupsListItem[],
  events: string[]
}

export interface EventsListItem {
  code: string,
  name: string,
  avatar: string,
  participants: User[],
  participantsTotal: number,
  sports: {
    code: string,
    name: string
  },
  group: {
    code: string,
    name: string
  },
  address: string,
  dateStart: string,
  dateEnd: string,
  posts: Post[]
}

export interface SportsKind {
  code: string,
  name: string,
  icon: string
}