import { CustomError } from "../../interface/ErrorInterface";

export class CustomResponseError extends Error implements CustomError {
  statusCode: number;
  name: string;

  constructor({ message, statusCode, name }: CustomError) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}
