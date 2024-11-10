import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/authService";
import { parseRegisterParams } from "../utils/parseParams";

const accessToken = process.env.ACCESS_TOKEN as string;

export class AuthController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = parseRegisterParams(req.body);
      await AuthService.register(params);
      res.status(200).json({
        message: "Register is Success, please login to enter app",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = req.body;
      const token = await AuthService.login(params);
      res.cookie(accessToken, token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
      });

      res.status(200).json({
        message: "Login Successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
