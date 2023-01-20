export interface Order {
  id: string
  user_id: string
  product_id: string
  status_of_order: 'active' | 'complete'
  quantity: number
}
