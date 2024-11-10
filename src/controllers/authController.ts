import { NextFunction, Request, Response } from "express";

export class AuthController {
  static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = req.body;
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
      res.status(200).json({
        message: "Login Successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
