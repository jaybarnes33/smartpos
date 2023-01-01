import dbConnect from "@/lib/db";
import User from "@/models/User";
import getUserID from "@/utils/getUserId";
import { generateAccessToken, generateRefreshToken } from "@/utils/token";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  accessToken?: string;
  refreshToken?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      console.log(req.body);
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `User with username ${username} does not exist` });
      } else if (!(await user.matchPassword(password))) {
        res.status(400).json({ message: "Incorrect password" });
      }
      const accessToken = generateAccessToken({ sub: user._id });
      const refreshToken = generateRefreshToken({ sub: user._id });

      return res
        .status(200)
        .json({ message: "Login Successful", accessToken, refreshToken });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  if (req.method === "GET") {
    try {
      await dbConnect();

      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        const userID = getUserID(token);
        if (!userID) return res.status(401).end("Unauthorized!");

        const user = await User.findById(userID).select("-password");

        if (!user) return res.status(400).end("User not found");

        res.json(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
