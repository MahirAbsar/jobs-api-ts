import express, { Express, Request, Response } from "express";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middlewares";
import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";

const app: Express = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get("/", (req: Request, res: Response) => {
  return res.send("Home page");
});

app.listen(3000, () => console.log(`Server is listening on port 3000`));
