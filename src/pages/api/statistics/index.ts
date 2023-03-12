import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { Product as IProduct } from "@/types/item";
import getUserID from "@/utils/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  products?: IProduct[];
  product?: IProduct;
  statistics?: {
    products: number;
    users: number;
    purchases: number;
    pending_deliveries: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    try {
      const token = req.headers.authorization?.split(" ")[1] as string;

      const userID = getUserID(token);

      if (!userID) return res.status(401).end("Unauthorized!");

      await dbConnect();

      const products = await Product.estimatedDocumentCount();
      const pending_deliveries = await Order.find({
        status: "pending",
      }).countDocuments();
      const orders = await Order.estimatedDocumentCount();
      const users = await User.estimatedDocumentCount();
      return res.status(200).json({
        message: "Products listed",
        statistics: {
          products,
          users,
          purchases: orders,
          pending_deliveries,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
