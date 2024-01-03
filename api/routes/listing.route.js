import express from 'express';
import { getListingsByType } from '../controllers/listing.controller.js'; 
const router = express.Router();
router.get('/listings', getListingsByType);
export default router;