import dbConnection from "./mongoConnection";

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection: any) => {
  let _col: any = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
export default { 
  users: getCollectionFn("users") as any,
  sets: getCollectionFn("sets") as any
};
