//create api route
import express from "express";
import { authenticateToken,updateProfile,getUserDetails } from "../controllers/user.controller.js";
import { addPropertyForSale } from "../controllers/user.controller.js";
import { getUserWishlist,getUserBoughtlist,getUserSellinglist,getUserSoldlist } from "../controllers/user.controller.js";
import { storage } from '../config/cloudinaryConfig.js';
import multer from "multer";
const upload = multer({ storage });
const router = express.Router();
router.post('/updateProfile', authenticateToken, updateProfile);
router.post('/addPropertyForSale',authenticateToken,upload.array('images'), addPropertyForSale);
router.get('/getUserWishist',authenticateToken,getUserWishlist);
router.get('/getUserBoughtlist',authenticateToken,getUserBoughtlist);
router.get('/getUserSellinglist',authenticateToken,getUserSellinglist);
router.get('/getUserSoldlist',authenticateToken,getUserSoldlist);
router.get('/getUserDetails',authenticateToken,getUserDetails);

export default router;