import express from 'express';
import { getSearchResults } from '../controllers/search.controller.js';
const router = express.Router();
router.get('/property',getSearchResults);


export default router;