import protectRoute from "./../middlewares/protectRoute.js";
import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
export default router;
