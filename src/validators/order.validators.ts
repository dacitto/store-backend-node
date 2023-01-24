import { NextFunction, Request, Response } from 'express'
import { unprocessableEntityResponse } from '../utils/response'
import { Order } from '../models/order.model'

// validate create request
const validateCreateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status_of_order, user_id } = req.body as Omit<Order, 'id'>

  const status_of_order_values = ['active', 'complete']

  const errorsBag = []

  if (!user_id) {
    errorsBag.push('user_id  is required')
  } else {
    if (isNaN(user_id)) {
      errorsBag.push('user_id must be a number')
    }
  }

  if (!status_of_order) {
    errorsBag.push('status_of_order is required')
  } else {
    if (!status_of_order_values.includes(status_of_order)) {
      errorsBag.push(
        `status_of_order must be a value from ${status_of_order_values} `
      )
    }
  }

  return errorsBag.length > 0
    ? unprocessableEntityResponse(res, errorsBag)
    : next()
}

export { validateCreateRequest }
