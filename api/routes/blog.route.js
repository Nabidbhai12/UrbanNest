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

import { showAllBlogsByTitle } from '../controllers/blog.controller.js';
import { showAllBlogsByTitleDesc } from '../controllers/blog.controller.js';
import { showAllBlogsByDate } from '../controllers/blog.controller.js';
import { showAllBlogsByDateDesc } from '../controllers/blog.controller.js';
import { showAllBlogsByUpvotes } from '../controllers/blog.controller.js';
import { showAllBlogsByDownvotes } from '../controllers/blog.controller.js';
import {showBlogsByTag} from '../controllers/blog.controller.js';

import { showTopFive } from '../controllers/blog.controller.js';
import {showBlogNoAuth} from '../controllers/blog.controller.js';

import {createComment} from '../controllers/blog.controller.js';
import {showMyComments} from '../controllers/blog.controller.js';
import { updateComment} from '../controllers/blog.controller.js';

import { upvoteComment } from '../controllers/blog.controller.js';
import { downvoteComment } from '../controllers/blog.controller.js';
import { decreaseUpvoteComment } from '../controllers/blog.controller.js';
import { decreaseDownvoteComment } from '../controllers/blog.controller.js';

import { deleteComment } from '../controllers/blog.controller.js';

import { showAllCommentsByUpvotes } from '../controllers/blog.controller.js';
import { showAllCommentsByDownvotes } from '../controllers/blog.controller.js';

import { showAllComments } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/createBlog',authenticateToken, createBlog);
router.get('/showMyBlogs',authenticateToken,showMyBlogs);
router.get('/showBlog/:id',authenticateToken,showBlog);
router.put('/updateBlog/:id',authenticateToken,updateBlog);

router.put('/upvoteBlog/:id',authenticateToken,upvoteBlog);
router.put('/downvoteBlog/:id',authenticateToken,downvoteBlog);
router.put('/decreaseUpvoteBlog/:id',authenticateToken,decreaseUpvoteBlog);
router.put('/decreaseDownvoteBlog/:id',authenticateToken,decreaseDownvoteBlog);

router.delete('/deleteBlog/:id',authenticateToken,deleteBlog);

router.get('/showAllBlogsByTitle',showAllBlogsByTitle);
router.get('/showAllBlogsByTitleDesc',showAllBlogsByTitleDesc);
router.get('/showAllBlogsByDate',showAllBlogsByDate);
router.get('/showAllBlogsByDateDesc',showAllBlogsByDateDesc);
router.get('/showAllBlogsByUpvotes',showAllBlogsByUpvotes);
router.get('/showAllBlogsByDownvotes',showAllBlogsByDownvotes);
router.get('/showBlogsByTag/:tag',showBlogsByTag);

router.get('/showTopFive',showTopFive);
router.get('/showBlogNoAuth/:id',showBlogNoAuth);

router.post('/createComment/:id',authenticateToken,createComment);
router.get('/showMyComments',authenticateToken,showMyComments);
router.put('/updateComment/:id',authenticateToken,updateComment);

router.put('/upvoteComment/:id',authenticateToken,upvoteComment);
router.put('/downvoteComment/:id',authenticateToken,downvoteComment);
router.put('/decreaseUpvoteComment/:id',authenticateToken,decreaseUpvoteComment);
router.put('/decreaseDownvoteComment/:id',authenticateToken,decreaseDownvoteComment);

router.delete('/deleteComment/:id',authenticateToken,deleteComment);

router.get('/showAllCommentsByUpvotes',showAllCommentsByUpvotes);
router.get('/showAllCommentsByDownvotes',showAllCommentsByDownvotes);

router.get('/showAllComments/:id',showAllComments);

export default router;