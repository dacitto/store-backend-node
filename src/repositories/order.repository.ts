import { Order } from '../models/order.model'
import DB from '../database'
import Repository from './base.repository'
import dbContext from './db-context'

export default class OrderRepository extends Repository<Order> {
  constructor() {
    super('')
    this.table = dbContext.orders
  }

  /**
   * create new Order
   * @param {Order} Order
   * @returns {Promise<Order>}
   */
  async createAsync(Order: Omit<Order, 'id'>): Promise<Order> {
    const { product_id, quantity, status_of_order, user_id } = Order
    const result = await DB.query(
      'INSERT INTO orders (product_id,quantity,status_of_order,user_id ) VALUES ($1, $2,$3,$4) RETURNING *',
      [product_id, quantity, status_of_order, user_id]
    )
    return result.rows[0]
  }

  /**
   * update Order
   * @param {Order} Order
   * @returns {Promise<Order>}
   */

  async updateAsync(Order: Order): Promise<Order> {
    const { id, product_id, quantity, status_of_order, user_id } = Order
    const result = await DB.query(
      'UPDATE orders SET product_id=$1,quantity=$2,status_of_order=$3,user_id=$4, WHERE id = $5 RETURNING *',
      [product_id, quantity, status_of_order, user_id, id]
    )
    return result.rows[0]
  }

  async singleAsync(value: number | string): Promise<Order> {
    const result = await DB.query(`SELECT * FROM ${this.table} WHERE id = $1`, [
      value,
    ])
    return result.rows[0]
  }
  /*
   * * get all active orders for a specific user
   */
  async activeOrderByUserAsync(user_id: number): Promise<Order[]> {
    // select all active orders
    const result = await DB.query(
      "SELECT * FROM  orders WHERE user_id=$1 AND status_of_order= 'active'",
      [user_id]
    )
    return result?.rows ?? []
  }
}
