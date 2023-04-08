import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const app: Express = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded());
app.use("/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
