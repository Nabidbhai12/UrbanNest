import express from 'express';
import { signup } from '../controllers/auth.controller.js';
import { signin } from '../controllers/auth.controller.js';
import { google } from '../controllers/auth.controller.js';

import { signout } from '../controllers/auth.controller.js';
import { storage } from '../config/cloudinaryConfig2.js';
import multer from "multer";

const router = express.Router();
const upload = multer({ storage });

router.post('/signup',upload.single('profilePicture'), signup);
router.post('/signin', signin);
router.post('/google',google);
router.post('/signout',signout);
export default router;