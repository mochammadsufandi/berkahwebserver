import { genSaltSync, hashSync, compareSync } from "bcrypt-ts";
import { BcryptParams } from "../interface/ParamsInterface";

const salt = genSaltSync(10);

export const hashPassword = (password: string): string => {
  return hashSync(password, salt);
};

export const comparePassword = (params: BcryptParams): boolean => {
  const { password, hashedPassword } = params;
  return compareSync(password, hashedPassword);
};
