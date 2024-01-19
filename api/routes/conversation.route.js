import express from "express";
import { startOrGetConversation } from "../controllers/conversation.controller.js";
import { sendMessage } from "../controllers/conversation.controller.js";
import { authenticateToken } from "../controllers/user.controller.js";
const router=express.Router();
router.post("/create",authenticateToken,startOrGetConversation);
router.post("/message",authenticateToken,sendMessage);
export default router;

