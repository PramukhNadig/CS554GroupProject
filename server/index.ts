import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import session from "express-session";

import cors from "cors";
// import { connectRedis } from "./config/redis.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
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
