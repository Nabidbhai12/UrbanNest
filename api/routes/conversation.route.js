import   express   from "express";

import { authenticateToken }   from "../controllers/user.controller.js";

const router= express.Router();

import { sendMessage    } from  "../controllers/conversation.controller.js";
 import { getAllusers } from   "../controllers/conversation.controller.js";
 import ConversationModel from   "../models/conversation.model.js";

import { getUserConversations }    from "../controllers/conversation.controller.js";

import {getConversationById} from "../controllers/conversation.controller.js";


export default   router;


router.post('/sendMessage', authenticateToken,sendMessage);

router.get('/getMessage', authenticateToken, getUserConversations);
router.get('/getUsers', authenticateToken, getAllusers);

router.put('/getOrCreateConversation/:userId', async (req, res) => {
    const { userId } = req.params; // The ID of the user selected for chatting
    const myUserId = req.user._id; // The logged-in user's ID, set by your authentication middleware
  
    try {
      let conversation = await ConversationModel.findOne({
        $or: [
          { sender: myUserId, receiver: userId },
          { sender: userId, receiver: myUserId }
        ]
      });
  
      if (!conversation) {
        // If no existing conversation, create a new one
        conversation = new ConversationModel({ sender: myUserId, receiver: userId });
        await conversation.save();
      }
  
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ message: "Error fetching or creating conversation", error: error.message });
    }
});

router.get('/:conversationId', authenticateToken, getConversationById);


