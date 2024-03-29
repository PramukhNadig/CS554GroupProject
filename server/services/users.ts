import bcrypt from "bcrypt";
import mongoCollections from "../config/mongoCollections";

/*
Properties of users collection
1. _id: ObjectId
2. username: string
3. password: string
4. email: string
5. owned_sets: array of ObjectIds
6. saved_sets: array of ObjectIds
*/

const users = mongoCollections.users;
const isAlpha = (str: string) => /^[a-zA-Z]*$/.test(str);

const createUser = async (
  username: string,
  password: string,
  email: string
) => {
  const lowerUsername = username.toLowerCase();
  if (!lowerUsername || !password) {
    throw new Error("Username or password is empty");
  }
  if (typeof lowerUsername !== "string" || lowerUsername.length < 4) {
    throw new Error(
      "user name should be a valid string and should be at least 4 characters long."
    );
  }

  const userCollections = await users();

  if (
    await userCollections.findOne({
      username: lowerUsername,
    })
  ) {
    throw new Error("There is already a user with that username");
  }

  if (typeof password !== "string" || password.length < 6) {
    throw new Error(
      "password should be a valid string and should be at least 4 characters long."
    );
  }

  const salt = await bcrypt.genSalt(10);

  await userCollections.insertOne({
    username: lowerUsername,
    password: await bcrypt.hash(password, salt),
    email,
    owned_sets: [],
    saved_sets: [],
  });
  return { userInserted: true };
};

const checkUser = async (username: string, password: string) => {
  const lowerUsername = username.toLowerCase();
  if (!lowerUsername || !password) {
    throw new Error("Username or password is empty");
  }
  if (typeof lowerUsername !== "string" || lowerUsername.length < 4) {
    throw new Error(
      "user name should be a valid string and should be at least 4 characters long."
    );
  }

  const userCollections = await users();

  if (typeof password !== "string" || password.length < 6) {
    throw new Error(
      "password should be a valid string and should be at least 4 characters long."
    );
  }

  const findUserName = await userCollections.findOne({
    username: lowerUsername,
  });

  if (!findUserName) {
    throw new Error("Either the username or password is invalid");
  }
  if (!(await bcrypt.compare(password, findUserName.password))) {
    throw new Error("Either the username or password is invalid");
  }

  return { authenticated: true, findUserName };
};

const saveSet = async (username: string, setID: string) => {
  const lowerUsername = username.toLowerCase();
  if (!lowerUsername || !setID) {
    throw new Error("Username or setID is empty");
  }
  if (typeof lowerUsername !== "string" || lowerUsername.length < 4) {
    throw new Error(
      "user name should be a valid string and should be at least 4 characters long."
    );
  }

  const userCollections = await users();

  const findUserName = await userCollections.findOne({
    username: lowerUsername,
  });

  if (!findUserName) {
    throw new Error("Either the username or setID is invalid");
  }

  const updateInfo = await userCollections.updateOne(
    { username: lowerUsername },
    { $addToSet: { saved_sets: setID } }
  );

  if (updateInfo.modifiedCount === 0) {
    await userCollections.updateOne(
      { username: lowerUsername },
      { $pull: { saved_sets: setID } }
    );
  }

  return { updated: true };
};

const getSavedSets = async (username: string) => {
  const lowerUsername = username.toLowerCase();
  if (!lowerUsername) {
    throw new Error("Username is empty");
  }
  if (typeof lowerUsername !== "string" || lowerUsername.length < 4) {
    throw new Error(
      "user name should be a valid string and should be at least 4 characters long."
    );
  }

  const userCollections = await users();

  const findUserName = await userCollections.findOne({
    username: lowerUsername,
  });

  if (!findUserName) {
    throw new Error("Either the username or setID is invalid");
  }

  return { saved_sets: findUserName.saved_sets };
};

const validateName = (name: string) => {
  if (!name) {
    throw new Error("Name is empty");
  }
  if (typeof name !== "string" || name.length < 4) {
    throw new Error(
      "Name should be a valid string and should be at least 4 characters long."
    );
  }
const username_regex = /^[a-zA-Z0-9]+$/;
  if(!username_regex.test(name)){
    throw new Error("Name should only contain letters and numbers")
  } 
};

const validateNameInDb = async(name:string) => {
    const userCollections = await users();
    name = name.toLowerCase();
  let user = userCollections.findOne({
    username: name,
  })
  if (!user) {
    throw new Error("Either the username or setID is invalid");

  }

};

export default { createUser, checkUser, saveSet, getSavedSets, validateName, validateNameInDb };