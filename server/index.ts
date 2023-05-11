import express, { Express, Request, Response, } from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";
import session from "express-session";
const rateLimiter = require("express-rate-limit");
import cookieParser from "cookie-parser";
import cors from "cors";
const csurf =require( "tiny-csrf")
import { connectRedis } from "./config/redis.js";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.disable('x-powered-by');
app.use('/', express.static(path.join(__dirname, '/client/build')));

app.use(
  session({
    name: "AuthCookie",
    secret: process.env.SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  rateLimiter({
    windowMs: 1 * 60 * 1000, 
    max: 500, 
  })
);


app.use(cookieParser(process.env.cookieSecret || "secret"));




app.use("/v1", router);


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  connectRedis();
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
