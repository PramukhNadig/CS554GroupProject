import express from "express";
import setServices from "../services/sets";
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
// define the about route
router.post("/", async (req, res) => {
  const { title, description, subject, cards } = req.body;
  await setServices.createSet("test", title, description, subject, cards);

  res.send("success");
});

export default router;
