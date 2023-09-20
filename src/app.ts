import "dotenv/config";
import "express-async-errors";
import express, { Express, Request, Response } from "express";
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
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";


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
const swaggerDocument = YAML.load("swagger.yaml");

app.get('/', (req:Request, res: Response) => {
  return res.send("<h1>Jobs API</h1><a href='/api-doc'>Documentation<a/>")
});
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
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
