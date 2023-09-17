import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
}

export const register = async (
  req: Request<{}, {}, RegistrationData>,
  res: Response
) => {
  const user = await User.create({ ...req.body });
  const token = (user as any).createJwt();
  return res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name }, token });
};

export const login = async (req: Request, res: Response) => {
  return res.status(200).send("Login");
};
