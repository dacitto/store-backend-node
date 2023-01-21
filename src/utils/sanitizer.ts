// find attribute 'password' and replace it's value with '*******'
import { User } from '../models/user.model'

const hidePassword = (user: User): User => {
  const { password, ...rest } = user
  return {
    ...rest,
  }
}

export { hidePassword }
