import { Document } from "mongoose";

export interface User {
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
  confirm_password?: string;
}
export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
}
