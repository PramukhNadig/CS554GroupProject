import getResponse from "../services/assistant";
import express from "express";
const router = express.Router();
import xss from "xss";
router.post('/', async (req, res) => {

    let input = xss(req.body.input);
    const response = await getResponse(input);

    res.send(response);

});

export default router;