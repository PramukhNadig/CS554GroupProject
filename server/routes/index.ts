import sets from "./sets";
import users from "./users";
import images from "./images";
import assistant from "./assistant";
import express from "express";
const router = express.Router();

// middleware that is specific to this router
router.use("/sets", sets);
router.use("/users", users);
router.use("/images", images);
router.use("/assistant", assistant);
router.use("*", (req, res) => {
    res.status(404).send("Not Found");
});

export default router;
