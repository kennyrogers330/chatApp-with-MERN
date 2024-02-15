import express from "express";
import { SignUp, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", SignUp);

router.get("/logout", logout);

export default router;
