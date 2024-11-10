import { PrismaClient } from "@prisma/client";
import { LoginParams } from "../interface/ParamsInterface";
import { CustomResponseError } from "../middleware/errorClass/errorClass";
import { comparePassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export class AuthService {
  static async register(): Promise<void> {}

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
    }
    if (!checkedPassword) {
      throw new CustomResponseError({
        name: "Wrong Password",
        statusCode: 400,
        message: "Your Password that you input is wrong, please Login again",
      });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return token;
  }
}
