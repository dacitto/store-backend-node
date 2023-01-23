import OrderRepository from '../repositories/order.repository'
import { Order } from '../models/order.model'

const _repo = new OrderRepository()

export default class OrderService {
  static getOrders = async (): Promise<Order[] | null> => {
    // get orders
    const orders = await _repo.listAsync()
    if (!orders) {
      return null
    }
    return orders as Order[]
  }

  static singleOrder = async (req: any): Promise<Order | null> => {
    const { id } = req.params
    const order = await _repo.singleAsync(parseInt(id)) // get post
    if (!order) {
      return null
    }
    return order
  }

  static getActiveOrdersByUser = async (req: any): Promise<Order[] | null> => {
    const { userId } = req.params
    const orders = await _repo.activeOrderByUserAsync(parseInt(userId)) // get post
    if (!orders) {
      return null
    }
    return orders
  }

  // create order
  static createOrder = async (req: Request) => {
    const order = req.body
    const createdProduct = await _repo.createAsync(order as any)
    return createdProduct
  }
}
