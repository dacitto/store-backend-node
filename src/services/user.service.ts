import { Response } from 'express'
import UserRepository from '../repositories/user.repository'
import { User } from '../models/user.model'
import { hidePassword } from '../utils/sanitizer'
import bcrypt from 'bcrypt'
import appConf from '../config/app.config'

const _repo = new UserRepository()

export default class UserService {
  // login request
  static getUsers = async (): Promise<User[] | null> => {
    // get parameters from request body

    // get users
    const users = await _repo.usersAsync()

    // 2. verify user exists
    if (!users) {
      return null
    }

    return users
  }
  static singleUser = async (req: any): Promise<User | null> => {
    const { id } = req.params
    const user = await _repo.singleUserAsync(parseInt(id)) // get post
    if (!user) {
      return null
    }
    return hidePassword(user)
  }

  // create user
  static createUser = async (req: Request) => {
    const user: any = req.body

    // generate a password hash
    const hashedPassword = bcrypt.hashSync(
      user.password + appConf.bcryptPaper,
      appConf.bcryptSalt
    )

    // assign hash value to the user object
    user.password = hashedPassword

    const createdUser = await _repo.createAsync(user)

    return createdUser
  }
}

export const user = (res: Response) => res.locals.user
