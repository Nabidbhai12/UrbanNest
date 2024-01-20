import express from 'express';
import { authenticateToken } from '../controllers/user.controller.js';
import { createBlog } from '../controllers/blog.controller.js';
import {showMyBlogs} from '../controllers/blog.controller.js';
import {showBlog} from '../controllers/blog.controller.js';
import { updateBlog } from '../controllers/blog.controller.js';
import {upvoteBlog} from '../controllers/blog.controller.js';
import  {downvoteBlog} from '../controllers/blog.controller.js';
import { decreaseUpvoteBlog } from '../controllers/blog.controller.js';
import { decreaseDownvoteBlog } from '../controllers/blog.controller.js';
import { deleteBlog } from '../controllers/blog.controller.js';
import { showAllBlogs } from '../controllers/blog.controller.js';
import { showTopFive } from '../controllers/blog.controller.js';
import {showBlogNoAuth} from '../controllers/blog.controller.js';

const router = express.Router();
router.post('/createBlog',authenticateToken, createBlog);
router.get('/showMyBlogs',authenticateToken,showMyBlogs);
router.get('/showBlog/:id',authenticateToken,showBlog);
router.put('/upvoteBlog/:id',authenticateToken,upvoteBlog);
router.put('/downvoteBlog/:id',authenticateToken,downvoteBlog);
router.put('/decreaseUpvoteBlog/:id',authenticateToken,decreaseUpvoteBlog);
router.put('/decreaseDownvoteBlog/:id',authenticateToken,decreaseDownvoteBlog);
router.delete('/deleteBlog/:id',authenticateToken,deleteBlog);
router.put('/updateBlog/:id',authenticateToken,updateBlog);
router.get('/showBlogNoAuth/:id',showBlogNoAuth);
router.get('/showAllBlogs',showAllBlogs);
router.get('/showTopFive',showTopFive);


export default router;