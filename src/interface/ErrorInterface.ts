export interface CustomError extends Error {
  message: string;
  name: string;
  statusCode: number;
}
