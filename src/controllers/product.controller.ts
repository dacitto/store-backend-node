import {
  badRequestResponse,
  notFoundResponse,
  resourceCreatedResponse,
} from '../utils/response'
import { Request, Response } from 'express'
import ProductService from '../services/product.service'
import { internalServerErrorResponse, successResponse } from '../utils/response'

const _service = ProductService
export default class ProductController {
  /*
   * products index
   */
  static index = async (req: Request, res: Response) => {
    try {
      const products = await _service.getProducts()
      if (products) {
        return successResponse(res, products)
      } else {
        return notFoundResponse(res)
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }
  /*
   * get a single product
   */
  static getProductById = async (req: Request, res: Response) => {
    try {
      const product = await _service.singleProduct(req)
      if (product) {
        return successResponse(res, product)
      } else {
        return notFoundResponse(res)
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }

  /*
   *  Create product
   */
  static createProduct = async (req: Request, res: Response) => {
    try {
      const createdProduct = await _service.createProduct(req as any)
      if (createdProduct) {
        return resourceCreatedResponse(res, createdProduct)
      } else {
        throw new Error('Unable to create Product')
      }
    } catch (error) {
      return badRequestResponse(res, error)
    }
  }
}
