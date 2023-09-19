"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const Job_1 = require("../models/Job");
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const getAllJobs = async (req, res) => {
    const { userId } = req.user;
    const jobs = await Job_1.Job.find({ createdBy: userId }).sort("createdAt");
    return res.status(http_status_codes_1.StatusCodes.OK).json({ jobs, count: jobs.length });
};
exports.getAllJobs = getAllJobs;
const getJob = async (req, res) => {
    const { params: { id: jobId }, user: { userId }, } = req;
    const job = await Job_1.Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new errors_1.NotFoundError(`No job found with id ${jobId}`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ job });
};
exports.getJob = getJob;
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job_1.Job.create(req.body);
    return res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
};
exports.createJob = createJob;
const updateJob = async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId }, } = req;
    if (company.trim() === "" || position.trim() === "") {
        throw new errors_1.BadRequestError("Company or positon cannot be empty");
    }
    const job = await Job_1.Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, { company, position }, { new: true, runValidators: true });
    if (!job) {
        throw new errors_1.NotFoundError(`No job found with id ${jobId}`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ job });
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId }, } = req;
    const job = await Job_1.Job.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
        throw new errors_1.NotFoundError(`No job found with id ${jobId}`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).send("Job deleted successfully!");
};
exports.deleteJob = deleteJob;
