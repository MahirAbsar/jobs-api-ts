"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.createJob = exports.getJob = exports.getAllJobs = void 0;
const getAllJobs = async (req, res) => {
    return res.status(200).send("Get all jobs");
};
exports.getAllJobs = getAllJobs;
const getJob = async (req, res) => {
    return res.status(200).send("Get single job");
};
exports.getJob = getJob;
const createJob = async (req, res) => {
    return res.status(200).send("Create Job");
};
exports.createJob = createJob;
const updateJob = async (req, res) => {
    return res.status(200).send("Update job");
};
exports.updateJob = updateJob;
const deleteJob = async (req, res) => {
    return res.status(200).send("Delete Job");
};
exports.deleteJob = deleteJob;
