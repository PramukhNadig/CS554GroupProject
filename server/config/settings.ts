import dotenv from "dotenv";
dotenv.config();

export default {
  mongoConfig: {
    serverUrl:
      process.env.MONGODB_URI || "mongodb+srv://tony0824:Wlsdn1995@cluster0.7akaqsf.mongodb.net/test",
    database: "cs554_db",
  },
};
