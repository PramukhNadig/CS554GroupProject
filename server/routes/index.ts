import learningSet from "./learningSet";
import users from "./users";
import express from "express";
const router = express.Router();

// middleware that is specific to this router
router.use("/learningSet", learningSet);
router.use("/users", users);

export default router;
