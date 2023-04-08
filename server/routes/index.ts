import learningSet from "./learningSet";
import express from "express";
const router = express.Router();

// middleware that is specific to this router
router.use("/learningSet", learningSet);

export default router;
