import { Document, ObjectId } from "mongoose";

export interface Order extends Document {
  teller: ObjectId;
  items: OrderItem[];
  customer: Customer;
  createdAt: string;
  total: number;
  status: string;
  payment_method: string;
  amt_paid: number;
}
export interface Customer {
  name: string;
  phone?: string;
  location?: string;
}

export interface IOrder {
  teller: ObjectId;
  items: OrderItem[];
  customer: Customer;
  createdAt?: string;
  total?: number;
  payment_method: string;
  amt_paid: number;
  status: string;
}
export interface OrderItem {
  item: ObjectId;
  price: number;
  quantity: number;
}
