import express from "express";
import ArticleController from "../controllers/articleController";

const router = express.Router();

router.get("/articles/admin", ArticleController.getAllArticleAdmin);
router.get(
  "/articles/admin/isFinished",
  ArticleController.getFinishArticleAdmin
);
router.get(
  "/articles/admin/isWorthyShowing",
  ArticleController.getIsWorthyShowingArticleAdmin
);
router.get(
  "/articles/admin/isDelete",
  ArticleController.getIsDeleteArticleAdmin
);
router.put("/articles/annuling", ArticleController.annulingPublishedArticle);
router.post("/articles/review", ArticleController.postNotification);
router.patch("/articles/finishReview", ArticleController.finishReview);
router.delete("/articles/hardDelete", ArticleController.hardDeleteArticleAdmin);

export default router;
