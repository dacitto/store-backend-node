export interface User {
  id: string
  username: string
  first_name: string
  last_name: string
  password?: string
}

export interface AuthObject {
  user: User
  token: string
}
