import { NextFunction, Request, Response } from 'express'
import ProductRepository from '../repositories/product.repository'
import { unprocessableEntityResponse } from '../utils/response'

const _repo = new ProductRepository()

// validate create request
const validateCreateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { product_name, price } = req.body

  const errorsBag = []

  if (!product_name) {
    errorsBag.push('product_name is required')
  } else {
    // check if username is already taken
    if (await _repo.singleAsync(product_name)) {
      errorsBag.push('product_name is already taken')
    }
  }

  if (!price) {
    errorsBag.push('price name is required')
  } else {
    if (isNaN(price)) {
      errorsBag.push('price must be a number')
    }
  }

  return errorsBag.length > 0
    ? unprocessableEntityResponse(res, errorsBag)
    : next()
}

export { validateCreateRequest }
