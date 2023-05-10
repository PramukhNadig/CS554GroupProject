import { MongoClient } from "mongodb";
import settings from "./settings";
const mongoConfig = settings.mongoConfig;

let _connection: any = undefined;
let _db: any = undefined;

export default {
  connectToDb: async () => {
    if (!_connection) {
      const client = new MongoClient(mongoConfig.serverUrl);
      _connection = await client.connect();
      _db = await _connection.db(mongoConfig.database);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  },
};
