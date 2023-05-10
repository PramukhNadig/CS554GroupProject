import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

export const connectRedis = async () => {
  const client = createClient({
    socket: {
      host: process.env.REDIS_URI,
      port: parseInt(process.env.REDIS_PORT || "6379"),
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  }
  );


  await client.connect();
  return client;
};
