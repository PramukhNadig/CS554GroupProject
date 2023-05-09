import { ObjectId } from "mongoose";
import mongoCollections from "../config/mongoCollections";
import { ObjectId as mongodbObjectId } from "mongodb";

const sets = mongoCollections.sets;
const users = mongoCollections.users;
/*
Properties of sets collection
1. _id: ObjectId
2. title: string
3. description: string
4. subject: string
5. cards: array of objects
*/

// I will add validation later

const getPostById = async (id: ObjectId) => {
  const setCollection = await sets();
  const set = await setCollection.findOne({ _id: id });
  if (set === null) throw `Could not find set with id of ${id}`;
  return set;
};

const getSets = async () => {
  const setCollection = await sets();
  const setList = await setCollection.find({}).toArray();
  return setList;
};

const getSetsById = async (id: string) => {
  const setCollection = await sets();
  const setList = await setCollection.findOne({
    _id: new (mongodbObjectId as any)(id),
  });

  return setList;
};

const getSetsByOwner = async (owner: string) => {
  const setCollection = await sets();
  const setList = await setCollection.find({ owner }).toArray();

  if (setList === null) throw `Could not find set with owner of ${owner}`;
  
  return setList;
};

const createSet = async (
  owner: String,
  title: String,
  description: String,
  subject: String,
  cards: any[],
) => {
  const setCollection = await sets();

  let newSet = {
    owner: owner,
    title: title,
    description: description,
    subject: subject,
    cards: cards,
  };

  const insertInfo = await setCollection.insertOne(newSet);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not add set";
  let newId = insertInfo.insertedId;

  return await getPostById(newId);
};

const deleteSet = async (id: ObjectId) => {
  const setCollection = await sets();
  const deletionInfo = await setCollection.deleteOne({ _id: id });

  if (deletionInfo.deletedCount === 0)
    throw `Could not delete set with id of ${id}`;
  return { setId: id, deleted: true };
};

const getSavedSetsByName = async (name: string) => {
  const userCollection = await users();
  const saved = await userCollection.findOne({ username: name });
  if (saved === null) throw `Could not find user with name of ${name}`;

  console.log(saved.saved_sets);
  for (let i = 0; i < saved.saved_sets.length; i++) {
    saved.saved_sets[i] = new mongodbObjectId(saved.saved_sets[i]);
  }
  const setCollection = await sets();
  const setList = await setCollection.find({ _id: { $in: saved.saved_sets } }).toArray();
  console.log(setList)
  return setList;
};

export default {
  getSets,
  getSetsById,
  getSetsByOwner,
  getPostById,
  createSet,
  deleteSet,
  getSavedSetsByName,
};
