import { Document } from "mongoose";

export interface Item {
  name: string;
  description: string;
  cost_price: number;
  selling_price: number;
  quantity: number;
  location: string;
}

export interface Product extends Document {
  name: string;
  selling_price: number;
  quantity: number;
  location: string;
  cost_price: number;
  description: string;
  number?: number;
}
