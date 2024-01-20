import Blog from "../models/blog.model.js";
import User from '../models/user.model.js';
import mongoose from "mongoose";

//Write createBlog function here. It will first check if the user is logged in or not. 
//If the user is logged in, it will create a new blog and save it to the database. 
//If the user is not logged in, it will send a 401 status code with a message "You are not logged in".
export const createBlog = async (req, res) => {
    // if (!req.user) {
    //     // User is not logged in
    //     return res.status(401).json({ message: "You are not logged in" });
    // }
    // const userId = req.user.id;
    // console.log("User id in createBlog: " + userId);
    try {
        //get user name from user id from database
        const userId = req.user.id;
        const user = await User.findById(userId);
        //get name
        const name = user.username;


        const { title, content, image } = req.body;
        const newBlog = new Blog({
            author : user,
            authorName : name,
            title,
            content,
            //...(tags && { tags }),
            ...(image && { image }),
        });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Show all blogs of a user
export const showMyBlogs = async (req, res) => {
    console.log("In showMyBlogs");
    try {
        const userId = req.user.id;
        console.log("User id in showMyBlogs: " + userId + " " + typeof(userId));
        const userIdObj = new mongoose.Types.ObjectId(userId);
        const blogs = await Blog.find({ "author" : userIdObj });
        //const blogs = await Blog.find({ "$expr": { "$eq": [{ "$toString": "$author._id" }, "$toString": userId] } });

        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Show one blog
export const showBlog = async (req, res) => {
    try {
        const blogid = req.params.id;
        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Update a blog
export const updateBlog = async (req, res) => {
    try {
        const blogid = req.params.id;
        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const { title, content} = req.body;
        blog.title = title;
        blog.content = content;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//Upvote a blog.
export const upvoteBlog = async (req, res) => {
    try {
        const blogid = req.params.id;
        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.numOfUpvotes += 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//Downvote a blog
export const downvoteBlog = async (req, res) => {
    try {
        const blogid = req.params.id;
        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.numOfDownvotes += 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Decrease upvote of a blog
export const decreaseUpvoteBlog = async (req, res) => {
    try {
        const blogid = req.params.id;
        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.numOfUpvotes -= 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Decrease downvote of a blog
export const decreaseDownvoteBlog = async (req, res) => {
    try {
        const blogid = req.params.id;
        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.numOfDownvotes -= 1;
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Show all blogs
export const showAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Show top 5 blogs based on upvotes
export const showTopFive = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ numOfUpvotes: -1 }).limit(5);
        res.status(200).json(blogs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//Show one blog, no auth
export const showBlogNoAuth = async (req, res) => {
    try {
        const blogid = req.params.id;
        const blog = await Blog.findById(blogid);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};


//Write deleteBlog function here. It will first check if the user is logged in or not.
//If the user is logged in, it will delete the blog with the given id from the database.
//If the user is not logged in, it will send a 401 status code with a message "You are not logged in".
export const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        console.log("req.user: " + req.user);
        console.log("User id in deleteBlog: " + userId);
        //console.log("User name in deleteBlog: " + req.user.username);
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        

        if (!(blog.author._id == req.user.id)) {
            return res.status(401).json({ message: "You are not authorized to delete this blog" });
        }
        await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
