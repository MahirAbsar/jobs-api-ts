import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

interface ICustomError {
  statusCode: number;
  msg: string;
}

interface Error {
  statusCode: number;
  message: string;
  code?: number;
  keyValue?: string;
  name?: string;
  value?: string;
  errors?: object;
}

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError: ICustomError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err?.message || "Something went wrong, try again later",
  };

  if (err.code === 11000) {
    customError.msg = `Duplicate value provide for ${Object.keys(
      err.keyValue!
    )} field. Please provide another value.`;
    customError.statusCode = 400;
  }
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors!)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `No job found with id ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};
