import mongoose from "mongoose";
const userConversationListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    }]
});

const UserConversationList = mongoose.model('UserConversationList', userConversationListSchema);
export default UserConversationList;
