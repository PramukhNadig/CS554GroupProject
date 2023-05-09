import express from "express";
import setServices from "../services/sets";
import users from "../services/users";
import { connectRedis } from "../config/redis";
import { Console } from "console";
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
  const client = await connectRedis();
  const ress = await client.get("sets");
  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    sets = await setServices.getSets();
    await client.set("sets", JSON.stringify(sets));
  }

  res.json(sets);
});

router.get("/my/:name", async (req, res) => {
  const sets = await setServices.getSetsByOwner(req.params.name);
  res.json(sets);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const client = await connectRedis();
  const ress = await client.hGet("sets", id);

  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    sets = await setServices.getSetsById(id);
    await client.hSet("sets", id, JSON.stringify(sets));
  }

  res.json(sets);
});

// define the about route
router.post("/", async (req, res) => {
  const { title, description, subject, cards } = req.body;
  let tmp = await setServices.createSet("test", title, description, subject, cards);
  const client = await connectRedis();
  await client.del("sets");
  await client.hSet("sets", tmp._id, JSON.stringify(tmp));
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
  console.log("userId", req.body.username);
  console.log("saveSet", req.body.setId);

  await users.saveSet(req.body.username, req.body.setId);

  res.send("success");
});

router.get("/sets/:name", async (req, res) => {
  const name = req.params.name;
  const client = await connectRedis();
  const ress = await client.hGet("sets", name);

  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    sets = await setServices.getSetsByOwner(name);
    await client.hSet("sets", name, JSON.stringify(sets));
  }

  res.json(sets);
});

router.get("/saved/:name", async (req, res) => {
  const name = req.params.name;
  const client = await connectRedis();
  const ress = await client.hGet("sets", name);

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

export default router;
