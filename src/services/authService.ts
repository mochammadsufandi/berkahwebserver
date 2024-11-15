import { PrismaClient } from "@prisma/client";
import { LoginParams, RegisterParams } from "../interface/ParamsInterface";
import { CustomResponseError } from "../middleware/errorClass/errorClass";
import { comparePassword, hashPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";
import { writeImageUser } from "../utils/writeFile";

const prisma = new PrismaClient();

const allowedExtImage = ["image/jpeg", "image/jpg", "image/svg"];

export class AuthService {
  static async register(params: RegisterParams): Promise<void> {
    const { name, email, password, role, image } = params;

    if (!name || !email || !password || !role)
      throw new CustomResponseError({
        name: "InvalidInputType",
        statusCode: 400,
        message: "Please Input All Required Field",
      });
    const imageUser = image ? image[0] : null;
    if (imageUser && !allowedExtImage.includes(imageUser.mimetype))
      throw new CustomResponseError({
        name: "InvalidInputImage",
        statusCode: 400,
        message: "Please Input the allowed image extension",
      });
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      throw new CustomResponseError({
        name: "User Already Exist",
        statusCode: 400,
        message: "User is Already Exist, please use the other email",
      });

    const imageURL = imageUser ? writeImageUser(imageUser) : null;

    const hashedPassword = hashPassword(password);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        imageURL,
      },
    });
  }

  static async login(params: LoginParams): Promise<string> {
    const { email, password } = params;
    if (!email || !password)
      throw new CustomResponseError({
        name: "InvalidInput",
        statusCode: 400,
        message: "Please Input Required Field to Login",
      });
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user)
      throw new CustomResponseError({
        name: "UserNotFound",
        statusCode: 400,
        message: `User with ${email} is Not Found`,
      });
    const checkedPassword = comparePassword({
      password,
      hashedPassword: user.password,
    });

    if (user.role === "admin") {
      if (!checkedPassword && password !== user.password) {
        throw new CustomResponseError({
          name: "Wrong Password",
          statusCode: 400,
          message: "Your Password that you input is wrong, please Login again",
        });
      }
    } else {
      if (!checkedPassword) {
        throw new CustomResponseError({
          name: "Wrong Password",
          statusCode: 400,
          message: "Your Password that you input is wrong, please Login again",
        });
      }
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return token;
  }
}
