import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    numOfUpvotes: {
        type: Number,
        default: 0
    },
    numOfDownvotes: {
        type: Number,
        default: 0
    },
    // numOfComments: {
    //     type: Number,
    //     default: 0
    // },
    // commentList: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Comment'
    //     }
    // ],
    content: {
        type: String,
        required: true,
        trim: true
    },
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;