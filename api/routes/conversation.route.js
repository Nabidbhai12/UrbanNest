import express from "express";

import { authenticateToken } from "../controllers/user.controller.js";
const router=express.Router();
import { getorCreateConversation } from "../controllers/conversation.controller.js";
import { sendMessage } from "../controllers/conversation.controller.js";
import { gettAllConversation } from "../controllers/conversation.controller.js";

export default router;

router.post('/create',authenticateToken,getorCreateConversation);
router.post('/sendMessage',authenticateToken,sendMessage);
router.get('/get/:userId',authenticateToken,gettAllConversation);
router.get('/get/:conversationId',authenticateToken,getConversation);