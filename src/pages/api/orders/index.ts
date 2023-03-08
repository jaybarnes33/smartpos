import dbConnect from "@/lib/db";
import Order from "@/models/Order";
import { Order as IOrder } from "@/types/order";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  orders?: IOrder[];
  order?: IOrder;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { teller, items, customer } = req.body;

      const order = await Order.create({ teller, items, customer });
      return res.status(201).json({ message: "Order created", order });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  }
  if (req.method === "GET") {
    try {
      await dbConnect();

      const orders: IOrder[] = await Order.find();
      return res.status(200).json({ message: "Products listed", orders });
    } catch (error) {
      console.log(error);
    }
  }
}
