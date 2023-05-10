import express from "express";
import setServices from "../services/sets";
import users from "../services/users";
import client from "../config/redis";
import { Console } from "console";
import { BSON } from "mongodb";
import { ObjectId } from "bson";
const router = express.Router();

type Card = {
  word: "";
  meaning: "";
  imageUrl: "";
};
type LearningSet = {
  id: string;
  owner: string;
  title: string;
  description: string;
  subject: string;
  cards: Card[];
};

// define the home page route
router.get("/", async (req, res) => {
  const ress = await client.get("set");
  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    sets = await setServices.getSets();
    await client.set("set", JSON.stringify(sets));
  }

  res.json(sets);
});

router.get('/my', async (req, res) => {
  return res.status(404).send("username is empty");
});

router.get("/my/:name", async (req, res) => {
  try {
    users.validateName(req.params.name);
  } catch (e) {
    console.log(e);
    return res.status(404).send("username is not valid");
  }

  try {
    users.validateNameInDb(req.params.name);
  } catch (e) {
    console.log(e);
    return res.status(404).send("user does not exist!");
  }
  console.log("req.params.name", req.params.name)
  if (!req.params.name) return res.status(404).send("username is empty");

  if (req.params.name === "undefined") return res.status(404).send("username is empty");

  if (req.params.name === "") return res.status(404).send("username is empty");

  const sets = await setServices.getSetsByOwner(req.params.name);
  res.json(sets);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!id) return res.status(404).send("id is empty");
  
  if (id === "undefined") return res.status(404).send("id is empty");
  
  if (id === "") return res.status(404).send("id is empty");
  
  const ress = await client.hGet("sets", id);

  let sets = ress ? JSON.parse(ress) : null;

  if (!sets) {
    try {
      sets = await setServices.getSetsById(id);
      await client.hSet("sets", id, JSON.stringify(sets));
    } catch (e) {
      console.log(e);
      return res.status(404).send("id is not valid");
    }
  }

  res.json(sets);
});

// define the about route
router.post("/", async (req, res) => {
  const { owner, title, description, subject, cards } = req.body;
  let tmp = await setServices.createSet(owner,title, description, subject, cards);
  await client.del("set");
  console.log("tmp", tmp)
  res.send("success");
});

router.post("/save", async (req, res) => {
  if (!req.body.username || !req.body.setId) {
    res.status(400).send("username or setId is empty");
    return;
  }

  await users.saveSet(req.body.username, req.body.setId);

  res.send("success");
});

router.post("/unsave", async (req, res) => {
  if (!req.body.username || !req.body.setId) {
    res.status(400).send("username or setId is empty");
    return;
  }
  client.hDel("sets", req.body.username);

  await users.saveSet(req.body.username, req.body.setId);

  res.send("success");
});

router.get("/sets/:name", async (req, res) => {
  try {
    users.validateName(req.params.name);
  } catch (e) {
    console.log(e);
    return res.status(404).send("username is not valid");
  }

  try {
    users.validateNameInDb(req.params.name);
  } catch (e) {
    console.log(e);
    return res.status(404).send("user does not exist!");
  }
  const name = req.params.name;
  const ress = await client.hGet("sets", name);

  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    sets = await setServices.getSetsByOwner(name);
    await client.hSet("sets", name, JSON.stringify(sets));
  }

  res.json(sets);
});

router.get("/saved/:name", async (req, res) => {

  try {
    users.validateName(req.params.name);
  } catch (e) {
    console.log(e);
    return res.status(404).send("username is not valid");
  }

  try {
    users.validateNameInDb(req.params.name);
  } catch (e) {
    console.log(e);
    return res.status(404).send("user does not exist!");
  }
  const name = req.params.name;
  const ress = await client.hGet("saved", name);

  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    try {
      sets = await users.getSavedSets(name);
      await client.hSet("sets", name, JSON.stringify(sets));
      return res.json(sets);
    } catch (e) {
      console.log(e);
      return res.status(404).send("username is empty");
    }

  }

  return res.json(sets);
});

router.get('/savedverbose/:name', async (req, res) => {
  const name = req.params.name;
  let sets = [];
  try {
    sets = await setServices.getSavedSetsByName(name);
  } catch (e) {
    console.log(e);
    return res.status(404).send("username is empty");
  }

  return res.json(sets);
});
      

export default router;
