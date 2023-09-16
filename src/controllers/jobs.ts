import { Request, Response } from "express";

export const getAllJobs = async (req: Request, res: Response) => {
  return res.status(200).send("Get all jobs");
};

export const getJob = async (req: Request, res: Response) => {
  return res.status(200).send("Get single job");
};

export const createJob = async (req: Request, res: Response) => {
  return res.status(200).send("Create Job");
};

export const updateJob = async (req: Request, res: Response) => {
  return res.status(200).send("Update job");
};

export const deleteJob = async (req: Request, res: Response) => {
  return res.status(200).send("Delete Job");
};
