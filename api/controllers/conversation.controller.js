import ConversationModel from "../models/conversation.model";
import MessageModel from "../models/message.model";

export const getorCreateConversation=async(req,res)=>
{
    const { senderId, receiverId } = req.body;

  try {
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new ConversationModel({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const sendMessage=async(req,res)=>
{
    const { conversationId, senderId, text } = req.body;

    try {
        const message = new MessageModel({
          conversationId,
          sender: senderId,
          text,
        });
    
        await message.save();
    
        // Update conversation's updatedAt to reflect the new message
        await ConversationModel.findByIdAndUpdate(conversationId, { updatedAt: Date.now() });
    
        res.status(201).json(message);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
export const gettAllConversation=async(req,res)=>
{
    const userId = req.params.userId;

  try {
    const conversations = await ConversationModel.find({
      participants: userId,
    }).populate('participants', 'name');

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const getConversation=async (req,res)=>
{
    const conversationId = req.params.conversationId;

    try {
      const messages = await MessageModel.find({ conversationId }).populate('sender', 'name');
  
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

