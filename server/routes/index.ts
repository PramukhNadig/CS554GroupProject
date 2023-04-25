import sets from "./sets";
import users from "./users";
import express from "express";
const router = express.Router();

// middleware that is specific to this router
router.use("/sets", sets);
router.use("/users", users);

export default router;
