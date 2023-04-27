import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import session from "express-session";

import cors from "cors";

dotenv.config();

const app: Express = express();
const port = 4000;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());


app.use(
  session({
    name: "AuthCookie",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: true,
  })
);


app.use("/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
