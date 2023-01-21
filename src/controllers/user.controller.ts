import {
  badRequestResponse,
  notFoundResponse,
  resourceCreatedResponse,
} from './../utils/response'
import { Request, Response } from 'express'
import UserService from '../services/user.service'
import { internalServerErrorResponse, successResponse } from '../utils/response'

const _service = UserService
export default class userController {
  /*
   * users index
   */
  static index = async (req: Request, res: Response) => {
    try {
      const users = await _service.getUsers()
      if (users) {
        return successResponse(res, users)
      } else {
        return notFoundResponse(res)
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }
  /*
   * get a single user
   */
  static getUserById = async (req: Request, res: Response) => {
    try {
      const user = await _service.singleUser(req)
      if (user) {
        return successResponse(res, user)
      } else {
        return notFoundResponse(res)
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }

  /*
   *  Create user
   */
  static createUser = async (req: Request, res: Response) => {
    try {
      const registeredUser = await _service.createUser(req as any)
      if (registeredUser) {
        return resourceCreatedResponse(res, registeredUser)
      } else {
        throw new Error('Unable to create user')
      }
    } catch (error) {
      return badRequestResponse(res, error)
    }
  }
}
