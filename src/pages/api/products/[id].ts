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
  if (req.method === "PUT") {
    try {
      await dbConnect();
      const token = req.headers.authorization?.split(" ")[1] as string;

      const userID = getUserID(token);
      console.log({ body: req.body });
      if (!userID) return res.status(401).end("Unauthorized!");
      const updated = await Product.findByIdAndUpdate(
        req.query.id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res
        .status(201)
        .json({ message: "Product updated", product: updated });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  } else if (req.method === "DELETE") {
    const token = req.headers.authorization?.split(" ")[1] as string;

    const userID = getUserID(token);

    if (!userID) return res.status(401).end("Unauthorized!");
    try {
      await dbConnect();
      await Product.findByIdAndDelete(req.query.id);
      return res.status(200).json({ message: "Product deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
