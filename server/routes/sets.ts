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

router.get("/my", async (req, res) => {
  const sets = await setServices.getSetsByOwner("test");
  res.json(sets);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const client = await connectRedis();
  const ress = await client.get("sets");

  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    sets = await setServices.getSetsById(id);
    await client.set("sets", JSON.stringify(sets));
  }

  res.json(sets);
});

// define the about route
router.post("/", async (req, res) => {
  const { title, description, subject, cards } = req.body;
  await setServices.createSet("test", title, description, subject, cards);

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

router.get("/sets/:name", async (req, res) => {
  const name = req.params.name;
  const client = await connectRedis();
  const ress = await client.get("sets" + name);

  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    sets = await setServices.getSetsByOwner(name);
    await client.set("sets" + name, JSON.stringify(sets));
  }

  res.json(sets);
});

router.get("/saved/:name", async (req, res) => {
  const name = req.params.name;
  const client = await connectRedis();
  const ress = await client.get("sets" + name);

  let sets = ress ? JSON.parse(ress) : null;
  if (!sets) {
    sets = await users.getSavedSets(name);
    await client.set("sets" + name, JSON.stringify(sets));
  }

  res.json(sets);
});

export default router;
