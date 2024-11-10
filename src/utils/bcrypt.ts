import bcrypt from "bcrypt";
import { BcryptParams } from "../interface/ParamsInterface";

const salt = bcrypt.genSaltSync(10);

export const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, salt);
};

export const comparePassword = (params: BcryptParams): boolean => {
  const { password, hashedPassword } = params;
  return bcrypt.compareSync(password, hashedPassword);
};
