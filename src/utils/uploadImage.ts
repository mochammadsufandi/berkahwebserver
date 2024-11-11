import multer from "multer";
import { multerUser } from "../middleware/multer";

export const uploadImageUser = multer({
  storage: multerUser,
  limits: { fieldSize: 2000000 },
}).fields([{ name: "image", maxCount: 1 }]);
