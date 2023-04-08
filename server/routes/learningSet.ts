import express from "express";
const router = express.Router();
type Card = {
  word: "";
  meaning: "";
  imageUrl: "";
};
type LearningSet = {
  id: string;
  title: string;
  description: string;
  subject: string;
  cards: Card[];
};
const learningSet: LearningSet[] = [];
// define the home page route
router.get("/", (req, res) => {
  res.json(learningSet);
});
// define the about route
router.post("/", (req, res) => {
  const { title, description, subject, cards } = req.body;
  learningSet.push({
    id: "1",
    title,
    description,
    subject,
    cards,
  });
  res.send("success");
});

export default router;
