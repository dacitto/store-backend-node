export interface Order {
  id: number
  user_id: string
  product_id: string
  status_of_order: 'active' | 'complete'
  quantity: number
}
