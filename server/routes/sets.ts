import express from "express";
import setServices from "../services/sets";
import users from "../services/users";
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
  const sets = await setServices.getSets();
  res.json(sets);
});

router.get("/my", async (req, res) => {
  const sets = await setServices.getSetsByOwner("test");
  res.json(sets);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const sets = await setServices.getSetsById(id);
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
  console.log("userId", req.body.username);
  console.log("saveSet", req.body.setId);
  await users.saveSet(req.body.username, req.body.setId);

  res.send("success");
});

router.get("/sets/:name", async (req, res) => {
  const name = req.params.name;
  const sets = await setServices.getSetsByOwner(name);
  res.json(sets);
});

export default router;
