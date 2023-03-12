import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { Product as IProduct } from "@/types/item";
import getUserID from "@/utils/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  products?: IProduct[];
  product?: IProduct;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      const token = req.headers.authorization?.split(" ")[1] as string;

      const userID = getUserID(token);

      if (!userID) return res.status(401).end("Unauthorized!");
      const { name, ...rest } = req.body;

      const exists = await Product.findOne({ name: name.toLowerCase() });
      if (exists) {
        return res.status(401).json({ message: "Product already exists" });
      }
      await Product.create({ name, ...rest });
      return res.status(201).json({ message: "Product created" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  }
  if (req.method === "GET") {
    try {
      const { keyword } = req.query;
      await dbConnect();
      if (!keyword) {
        const products: IProduct[] = await Product.find();
        return res.status(200).json({ message: "Products listed", products });
      } else {
        const products: IProduct[] = await Product.find({
          name: { $regex: keyword, $options: "i" },
        });
        return res.status(200).json({ message: "Products listed", products });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
