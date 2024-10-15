import express from 'express';
import articleRoute from './articleRoute'

const router = express.Router();

router.use(articleRoute);

export default router;
