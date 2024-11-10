import { NextFunction, Request, Response } from "express";
import { CustomResponseError } from "./errorClass/errorClass";
import { verifyToken } from "../utils/jwt";
import { PrismaClient } from "@prisma/client";
import { UserPayload } from "../interface/ParamsInterface";
const prisma = new PrismaClient();

declare module "express" {
  export interface Request {
    loggedUser?: UserPayload;
  }
}

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.AccessToken;
    if (!accessToken) {
      throw new CustomResponseError({
        name: "NoToken",
        statusCode: 400,
        message: "Authentication Token is Needed, please login First",
      });
    }
    const user = verifyToken(accessToken);

    if (!user)
      throw new CustomResponseError({
        name: "FailedToken",
        statusCode: 400,
        message: "Authentication is Failed, please login again",
      });
    const existingUser = await prisma.user.findUnique({
      where: {
        id: user.id,
        email: user.email,
      },
    });
    if (!existingUser)
      throw new CustomResponseError({
        name: "UserNotFound",
        statusCode: 400,
        message: "Authentication is Failed, Please Login Again",
      });
    req.loggedUser = user;
    next();
  } catch (err) {
    next(err);
  }
};

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loggedUser = req.loggedUser;
    if (!loggedUser)
      throw new CustomResponseError({
        name: "Unauthorized",
        statusCode: 400,
        message: "Authorization is Failed, User is Not Found",
      });
    if (loggedUser.role !== "admin")
      throw new CustomResponseError({
        name: "Unauthorized",
        statusCode: 400,
        message: "User is Unauthorized, Can not Access this",
      });

    next();
  } catch (err) {
    next(err);
  }
};
