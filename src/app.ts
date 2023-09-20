import "dotenv/config";
import "express-async-errors";
import express, { Express } from "express";
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
  authenticationMiddleware,
} from "./middlewares";
import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";
import { connectDB } from "./db/connect";
import helmet from "helmet";
import cors from "cors";
import { xss } from "express-xss-sanitizer";
import { rateLimit } from "express-rate-limit";

const app: Express = express();

app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use(limiter);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticationMiddleware, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
