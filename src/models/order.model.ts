export interface Order {
  id: number
  user_id: number
  status_of_order: 'active' | 'complete'
}
