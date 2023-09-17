import "dotenv/config";
import express, { Express } from "express";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middlewares";
import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";
import { connectDB } from "./db/connect";

const app: Express = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

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
