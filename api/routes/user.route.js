//create api route
import express from "express";
import { authenticateToken,updateProfile } from "../controllers/user.controller.js";
import { addPropertyForSale } from "../controllers/user.controller.js";
import { getUserWishlist,getUserBoughtlist,getUserSellinglist,getUserSoldlist } from "../controllers/user.controller.js";
const router = express.Router();
router.post('/updateProfile', authenticateToken, updateProfile);
router.post('/addPropertyForSale', authenticateToken, addPropertyForSale);
router.get('/getUserWishist',authenticateToken,getUserWishlist);
router.get('/getUserBoughtlist',authenticateToken,getUserBoughtlist);
router.get('/getUserSellinglist',authenticateToken,getUserSellinglist);
router.get('/getUserSoldlist',authenticateToken,getUserSoldlist);

export default router;