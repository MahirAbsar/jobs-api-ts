import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  return res.status(200).send("Register");
};

export const login = async (req: Request, res: Response) => {
  return res.status(200).send("Login");
};
