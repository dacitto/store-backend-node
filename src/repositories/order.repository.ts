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
    const { status_of_order, user_id } = Order
    const result = await DB.query(
      'INSERT INTO orders (status_of_order,user_id ) VALUES ($1, $2) RETURNING *',
      [status_of_order, user_id]
    )
    return result.rows[0]
  }

  /**
   * update Order
   * @param {Order} Order
   * @returns {Promise<Order>}
   */

  async updateAsync(Order: Order): Promise<Order> {
    const { id, status_of_order, user_id } = Order
    const result = await DB.query(
      'UPDATE orders SET status_of_order=$1,user_id=$2, WHERE id = $3 RETURNING *',
      [status_of_order, user_id, id]
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
