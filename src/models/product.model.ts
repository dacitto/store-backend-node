export interface Product {
  id: string;
  name: string;
  price: number;
  // category:string
}
export interface Order {
  id: string;
  user_id: string;
  status_of_order: "active" | "complete";
  // - id of each product in the order
  // - quantity of each product in the order
}
