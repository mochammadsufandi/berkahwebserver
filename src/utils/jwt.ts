import jwt, { SignOptions } from "jsonwebtoken";
import { UserPayload } from "../interface/ParamsInterface";

const JWT_SECRET_KEY = process.env.SECRET_KEY || "berkah-website";

const jwtOption: SignOptions = {
  expiresIn: "2h",
};

export const generateToken = (payload: UserPayload): string => {
  return jwt.sign(payload, JWT_SECRET_KEY, jwtOption);
};

export const verifyToken = (token: string): UserPayload | null => {
  try {
    const decodeToken = jwt.verify(token, JWT_SECRET_KEY);
    return decodeToken as UserPayload;
  } catch (err) {
    console.log(err);
    return null;
  }
};
