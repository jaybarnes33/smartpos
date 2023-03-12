import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { Product } from "@/types/item";
const productSchema = new mongoose.Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    selling_price: {
      type: Number,
      default: 0,
      required: true,
    },
    description: {
      type: String,
    },
    cost_price: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text" });
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
