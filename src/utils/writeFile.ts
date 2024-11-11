import fs from "fs";
import path from "path";

export const writeImageUser = (image: Express.Multer.File): string => {
  const imageName =
    image.fieldname +
    Date.now() +
    "-" +
    Math.round(Math.random() * 1e9) +
    path.extname(image.originalname);
  const imagePath = path.join(__dirname, "../../public/images/user", imageName);
  fs.writeFileSync(imagePath, image.buffer);
  return imageName;
};
