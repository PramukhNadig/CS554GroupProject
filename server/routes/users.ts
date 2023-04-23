import express from "express";
import UserServices from "../services/users";
const router = express.Router();
type User = {
  username: string;
  password: string;
  email: string;
  //add more if we need
};

// define the home page route

// define the about route
router.post("/signup", async (req, res) => {
  console.log("req", req.body);
  const { username, password, email } = req.body;
  await UserServices.createUser(username, password, email);

  res.send("success");
});

router.post("/login", async (req, res) => {
  console.log("req", req.body);
  const { username, password } = req.body;
  const { findUserName } = await UserServices.checkUser(username, password);
  //   (req.session as any).user = findUserName;
  res.send("success");
});

export default router;
