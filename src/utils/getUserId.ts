import { verify } from "jsonwebtoken";

const getUserID = (token: string) => {
  try {
    const payload: any = verify(token, process.env.JWT_SECRET!);
    return payload.sub;
  } catch (error) {
    return (error as Record<string, any>).message;
  }
};
export default getUserID;
