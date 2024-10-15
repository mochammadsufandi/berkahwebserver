import express from 'express';
import ArticleController from '../controllers/articleController';

const router = express.Router();

router.get('/articles/admin',ArticleController.getAllArticleAdmin);

export default router;