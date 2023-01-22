import { Product } from './../models/product.model'
import DB from '../database'
import Repository from './base.repository'
import dbContext from './db-context'

export default class ProductRepository extends Repository<Product> {
  constructor() {
    super('')
    this.table = dbContext.products
  }

  /**
   * create new Product
   * @param {Product} product
   * @returns {Promise<Product>}
   */
  async createAsync(Product: Omit<Product, 'id'>): Promise<Product> {
    const { product_name, price } = Product
    const result = await DB.query(
      'INSERT INTO products (product_name, price) VALUES ($1, $2) RETURNING *',
      [product_name, price]
    )
    return result.rows[0]
  }

  /**
   * update product
   * @param {Product} product
   * @returns {Promise<Product>}
   */

  async updateAsync(Product: Product): Promise<Product> {
    const { id, product_name, price } = Product
    const result = await DB.query(
      'UPDATE products SET product_name = $1, price = $2, WHERE id = $3 RETURNING *',
      [product_name, price, id]
    )
    return result.rows[0]
  }

  async singleAsync(value: number | string | object): Promise<Product> {
    const column =
      typeof value == 'number'
        ? 'id'
        : typeof value == 'string'
        ? 'product_name'
        : Object.keys(value)[0]
    value = typeof value == 'object' ? Object.values(value)[0] : value
    const result = await DB.query(
      `SELECT * FROM ${this.table} WHERE ${column} = $1`,
      [value]
    )
    return result.rows[0]
  }
}
