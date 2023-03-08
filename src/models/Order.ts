import { Order, OrderItem } from "@/types/order";
import mongoose, { SchemaTypes } from "mongoose";

const orderItem = new mongoose.Schema<OrderItem>({
  item: {
    type: SchemaTypes.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
  },
});
const orderSchema = new mongoose.Schema<Order>(
  {
    teller: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItem],
    },
    customer: {
      name: String,
      phone: String,
      location: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
