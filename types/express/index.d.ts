import { UserPayload } from "../../src/interface/ParamsInterface";

declare module "express" {
  export interface Request {
    loggedUser?: UserPayload;
    files?: {
      image?: Express.Multer.File[];
    };
  }
}
