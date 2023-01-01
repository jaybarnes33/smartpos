import dbConnect from "@/lib/db";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      console.log(req.body);
      const { username, name, password } = req.body;

      const exists = await User.findOne({ username });
      if (exists) {
        return res.status(401).json({ message: "User already exists" });
      }
      await User.create({ username, name, password });
      return res.status(201).json({ message: "User created" });
    } catch (error) {
      console.log(error);
    }
  }
}
