"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const User_1 = require("../models/User");
const register = async (req, res) => {
    const user = await User_1.User.create({ ...req.body });
    const token = user.createJwt();
    return res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ user: { name: user.name }, token });
};
exports.register = register;
const login = async (req, res) => {
    return res.status(200).send("Login");
};
exports.login = login;
