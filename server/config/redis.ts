// import { createClient } from "redis";
// import dotenv from "dotenv";

// export const connectRedis = async () => {
//   const client = createClient({
//     password: dotenv.config().parsed?.REDIS_PASSWORD,
//     socket: {
//       host: 'redis-10140.c10.us-east-1-4.ec2.cloud.redislabs.com',
//       port: 10140
//     }
//   });
//   client.on("error", (err) => console.log("Redis Client Error", err));

//   await client.connect();
//   return client;
// };
