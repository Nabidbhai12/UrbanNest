import express from 'express';
import { searchProperties} from '../controllers/search.controller.js';
import { authenticateToken } from '../controllers/user.controller.js';
const router = express.Router();
router.get('/property',authenticateToken,searchProperties);


export default router;