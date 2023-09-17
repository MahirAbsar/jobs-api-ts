"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const auth_1 = __importDefault(require("./routes/auth"));
const jobs_1 = __importDefault(require("./routes/jobs"));
const connect_1 = require("./db/connect");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/auth", auth_1.default);
app.use("/api/v1/jobs", jobs_1.default);
app.use(middlewares_1.notFoundMiddleware);
app.use(middlewares_1.errorHandlerMiddleware);
const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await (0, connect_1.connectDB)(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
