import express from "express";
import UserServices from "../services/users";
import { SessionData } from 'express-session';
const router = express.Router();

type User = {
  username: string;
  password: string;
  email: string;
  owned_sets: [],
  saved_sets: []
};

declare module 'express-session' {
  interface SessionData {
      user?: User;
  }
}

router.post("/signup", async (req, res) => {
  console.log("req", req.body);
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({"error": "must include username, password, and email"})
  }
  try {
    const new_user = await UserServices.createUser(username, password, email);
    res.status(200).json(new_user)
  } catch(e) {
    res.status(500).json({"error": "server error"});
  }
});

router.post("/login", async (req, res) => {
  console.log("req", req.body);
  const { username, password } = req.body;
  if (!username || !password ) {
    return res.status(400).json({"error": "must include username, password, and email"})
  }
  try {
    const { findUserName } = await UserServices.checkUser(username, password);
    req.session.user = findUserName;
    res.status(200).json({findUserName})
  } catch(e) {
    res.status(500).json({"error": "server error"});
  }
});

router.get("/auth", async (req, res) => {
  if (req.session && req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({"status": "not authenticated"});
  }
});

export default router;
