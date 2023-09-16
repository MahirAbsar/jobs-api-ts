"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const register = async (req, res) => {
    return res.status(200).send("Register");
};
exports.register = register;
const login = async (req, res) => {
    return res.status(200).send("Login");
};
exports.login = login;
