import express from 'express';
import { createBlog } from '../controllers/blog.controller.js';
import { deleteBlog } from '../controllers/blog.controller.js';
import { updateBlog } from '../controllers/blog.controller.js';
import { showBlog } from '../controllers/blog.controller.js';
import { showAll } from '../controllers/blog.controller.js';
import { showTopTen } from '../controllers/blog.controller.js';

const router = express.Router();
router.post('/create', createBlog);

export default router;