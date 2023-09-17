import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthenticatedError } from "../errors";
import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BadRequestError || err instanceof UnauthenticatedError) {
    return res.status(err.statusCode).json({ err: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};
