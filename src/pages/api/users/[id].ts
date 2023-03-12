import dbConnect from "@/lib/db";
import User from "@/models/User";
import Product from "@/models/User";
import { User as IUser } from "@/types/user";
import getUserID from "@/utils/getUserId";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  users?: IUser[];
  user?: IUser;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "PUT") {
    try {
      const token = req.headers.authorization?.split(" ")[1] as string;
      const userID = getUserID(token);
      if (!userID) return res.status(401).end("Unauthorized!");
      await dbConnect();

      const updated = await User.findByIdAndUpdate(
        req.query.id,
        {
          ...req.body,
        },
        { new: true }
      );

      return res.status(201).json({ message: "User updated", user: updated });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
  } else if (req.method === "DELETE") {
    try {
      const token = req.headers.authorization?.split(" ")[1] as string;

      const userID = getUserID(token);

      if (!userID) return res.status(401).end("Unauthorized!");
      await dbConnect();
      await User.findByIdAndDelete(req.query.id);
      return res.status(200).json({ message: "User deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
