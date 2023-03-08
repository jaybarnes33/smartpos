import { ObjectId } from "mongoose";

export interface Order {
  teller: ObjectId;
  items: OrderItem[];
  customer: Customer;
}
export interface Customer {
  name: string;
  phone?: number;
  location?: string;
}

export interface OrderItem {
  item: ObjectId;
  quantity: number;
}
