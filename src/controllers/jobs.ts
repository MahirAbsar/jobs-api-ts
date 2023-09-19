import { Request, Response } from "express";
import { Job } from "../models/Job";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";

export const getAllJobs = async (req: Request, res: Response) => {
  const { userId } = req.user;
  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");
  return res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

export const getJob = async (req: Request, res: Response) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  return res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req: Request, res: Response) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  return res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req: Request, res: Response) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company.trim() === "" || position.trim() === "") {
    throw new BadRequestError("Company or positon cannot be empty");
  }

  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    { company, position },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  return res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req: Request, res: Response) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new NotFoundError(`No job found with id ${jobId}`);
  }

  return res.status(StatusCodes.OK).send("Job deleted successfully!");
};
