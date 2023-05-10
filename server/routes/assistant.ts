import getResponse from "../services/assistant";
import express from "express";
const router = express.Router();

router.post('/', async (req, res) => {
    console.log("req.body.input", req.body.input);
    const response = await getResponse(req.body.input);

    res.send(response);

});

export default router;