import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";
import { BadRequestError, UnauthenticatedError } from "../errors";

export const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = (user as any).createJwt();
  return res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordMatch = await (user as any).comparePassword(password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = (user as any).createJwt();

  return res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
