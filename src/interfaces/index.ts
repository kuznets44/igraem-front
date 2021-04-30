export interface GroupsListItem {
  code: string,
  name: string,
  avatar: string,
  sports: {
    code: string,
    name: string
  },
  city: string,
  images?: string[]
}

export interface Post {
  by: {
    id: number,
    name: string,
    avatar: string
  },
  date: string,
  text: string
}

export interface User {
  id: number,
  name: string,
  avatar: string,
  country: string,
  city: string,
  groups: string[],
  events: string[]
}

export interface EventsListItem {
  code: string,
  name: string,
  avatar: string,
  participants: {
    current: number,
    total: number
  },
  sports: {
    code: string,
    name: string
  },
  group: {
    code: string,
    name: string
  },
  address: string,
  date: string,
  timeStart: string,
  timeEnd: string,
  posts: Post[]
}

export interface SportType {
  code: string,
  name: string,
  image: string
}