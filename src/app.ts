import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorhandler";
import notFound from "./middlewares/notFound";

const app: Application = express();
// const port = 3000

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
