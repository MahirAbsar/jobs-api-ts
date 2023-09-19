"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = require("../models/User");
const errors_1 = require("../errors");
const register = async (req, res) => {
    const user = await User_1.User.create({ ...req.body });
    const token = user.createJwt();
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ user: { name: user.name }, token });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.BadRequestError("Please provide email and password");
    }
    const user = await User_1.User.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid credentials");
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        throw new errors_1.UnauthenticatedError("Invalid credentials");
    }
    const token = user.createJwt();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: { name: user.name }, token });
};
exports.login = login;
