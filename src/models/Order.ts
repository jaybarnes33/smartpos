import { Order, OrderItem } from "@/types/order";
import mongoose, { SchemaTypes } from "mongoose";

const orderItem = new mongoose.Schema<OrderItem>(
  {
    item: {
      type: SchemaTypes.ObjectId,
      ref: "Product",
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);
const orderSchema = new mongoose.Schema<Order>(
  {
    teller: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    amt_paid: {
      type: Number,
    },
    payment_method: {
      type: String,
      enum: ["momo", "cash", "bank"],
    },
    items: {
      type: [orderItem],
      _id: false,
    },
    customer: {
      name: String,
      phone: String,
      location: String,
    },

    status: {
      type: String,
      enum: ["pending", "processed"],
      default: "processed",
    },
    total: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
