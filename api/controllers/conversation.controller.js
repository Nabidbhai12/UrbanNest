import Conversation from '../models/conversation.model.js';
import Listing from '../models/listing.model.js';
import Message from '../models/message.model.js';
import UserConversationList from '../models/userconversation.model.js'

export const startOrGetConversation = async (req, res, next) => {
    const userId = req.user.id; // Assuming user ID is extracted from JWT token
    const { propertyId } = req.body; // ID of the property listing

    try {
        // Find the property listing
        const property = await Listing.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Check if there's already a conversation between the user and the property owner
        let conversation = await Conversation.findOne({
            participants: { $all: [userId, property.owner] },
            property: propertyId
        });

        // If not, create a new conversation and update UserConversationList for each participant
        if (!conversation) {
            conversation = new Conversation({
                participants: [userId, property.owner],
                property: propertyId
            });
            await conversation.save();

            // Add conversation to UserConversationList for each participant
            const participantIds = [userId, property.owner];
            for (const participantId of participantIds) {
                let userConversationList = await UserConversationList.findOne({ user: participantId });
                if (!userConversationList) {
                    // Create new UserConversationList for this user
                    userConversationList = new UserConversationList({
                        user: participantId,
                        conversations: [conversation._id]
                    });
                } else {
                    // Add to existing UserConversationList
                    userConversationList.conversations.push(conversation._id);
                }
                await userConversationList.save();
            }
        }

        res.status(200).json(conversation);
    } catch (error) {
        next(error);
    }
};

export const sendMessage = async (req, res, next) => {
    const userId = req.user.id; // Extracted from JWT token
    const { conversationId, text } = req.body; // ID of the conversation and text of the message

    try {
        // Validate the conversation exists and user is a participant
        const conversation = await Conversation.findById(conversationId);
        if (!conversation || !conversation.participants.includes(userId)) {
            return res.status(404).json({ message: 'Conversation not found or access denied' });
        }

        // Create and save the new message
        const message = new Message({
            conversationId,
            sender: userId,
            text,
            read:false
        });
        await message.save();

        // Add message to conversation's message list
        conversation.messages.push(message._id);
        await conversation.save();

        res.status(201).json(message);
    } catch (error) {
        next(error);
    }
};

