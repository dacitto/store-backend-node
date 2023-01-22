import ProductRepository from '../repositories/product.repository'
import { Product } from '../models/product.model'

const _repo = new ProductRepository()

export default class ProductService {
  static getProducts = async (): Promise<Product[] | null> => {
    // get products
    const products = await _repo.listAsync()
    if (!products) {
      return null
    }
    return products as Product[]
  }
  static singleProduct = async (req: any): Promise<Product | null> => {
    const { id } = req.params
    const product = await _repo.singleAsync(parseInt(id)) // get post
    if (!product) {
      return null
    }
    return product
  }

  // create product
  static createProduct = async (req: Request) => {
    const product: any = req.body
    const createdProduct = await _repo.createAsync(product)
    return createdProduct
  }
}
