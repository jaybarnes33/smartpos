import dbConnect from "@/lib/db";
import User from "@/models/User";
import { IUser } from "@/types/user";
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
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { username, name, password, email } = req.body;

      const exists = await User.findOne({ username });
      if (exists) {
        return res.status(401).json({ message: "User already exists" });
      }
      await User.create({ username, name, password, email });
      return res.status(201).json({ message: "User created" });
    } catch (error) {
      console.log(error);
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect();

      const users = await User.find();
      return res.status(201).json({ message: "User created", users });
    } catch (error) {
      console.log(error);
    }
  }
}
