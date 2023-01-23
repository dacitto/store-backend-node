import {
  badRequestResponse,
  notFoundResponse,
  resourceCreatedResponse,
} from '../utils/response'
import { Request, Response } from 'express'
import OrderService from '../services/order.service'
import { internalServerErrorResponse, successResponse } from '../utils/response'

const _service = OrderService
export default class OrderController {
  /*
   * orders index
   */
  static index = async (req: Request, res: Response) => {
    try {
      const orders = await _service.getOrders()
      if (orders) {
        return successResponse(res, orders)
      } else {
        return notFoundResponse(res)
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }
  /*
   * get a single order
   */
  static getOrderById = async (req: Request, res: Response) => {
    try {
      const order = await _service.singleOrder(req)
      if (order) {
        return successResponse(res, order)
      } else {
        return notFoundResponse(res)
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }

  /*
   *  Create order
   */
  static createOrder = async (req: Request, res: Response) => {
    try {
      const createdOrder = await _service.createOrder(req as any)
      if (createdOrder) {
        return resourceCreatedResponse(res, createdOrder)
      } else {
        throw new Error('Unable to create Order')
      }
    } catch (error) {
      return badRequestResponse(res, error)
    }
  }

  /*
   *  get Active orders by user id
   */
  static getOrderByUserId = async (req: Request, res: Response) => {
    try {
      const order = await _service.getActiveOrdersByUser(req)
      if (order) {
        return successResponse(res, order)
      } else {
        return notFoundResponse(res)
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }
}
