import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const client = createClient({
    password: "RvlldzGYV39fk2OijpKwZEcFLMA0OCbT",
    socket: {
        host: 'redis-10140.c10.us-east-1-4.ec2.cloud.redislabs.com',
        port: 10140
  }
});

client.on("error", (error) => {
    console.error(error);
}
);

export const connectRedis = async () => {
    await client.connect();
    console.log("connected to redis");
}

export default client;

