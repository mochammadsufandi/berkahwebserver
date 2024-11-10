import { Request, Response, NextFunction } from "express";
import ArticleService from "../services/articleService";
import {
  parseAnnulingArticleParams,
  parseFinishReviewParams,
  parseGetIsDeleteArticleParams,
  parseGetIsFinishedArticleParams,
  parseGetIsWorthyShowingArticleParams,
  parseHardDeleteArticeParams,
  parsePostNotificationParams,
} from "../utils/parseParams";

class ArticleController {
  static async getAllArticleAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const articles = await ArticleService.getAllArticleAdmin();
      res.status(200).json({
        message: "Fetch Article is Successfully",
        data: articles,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getFinishArticleAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = parseGetIsFinishedArticleParams(req.query);
      console.log(params);
      const article = await ArticleService.getFinishArticleAdmin(params);
      res.status(200).json({
        message: "Fetch Finished Article is Successfully",
        data: article,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getIsWorthyShowingArticleAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = parseGetIsWorthyShowingArticleParams(req.query);
      const article = await ArticleService.getIsWorthyShowingArticleAdmin(
        params
      );
      res.status(200).json({
        message: "Fetch isShowing Article is Successfully",
        data: article,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getIsDeleteArticleAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = parseGetIsDeleteArticleParams(req.query);
      const article = await ArticleService.getIsDeleteArticleAdmin(params);
      res.status(200).json({
        message: "Fetch Deleted Article is Successfully",
        data: article,
      });
    } catch (err) {
      next(err);
    }
  }

  static async annulingPublishedArticle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = parseAnnulingArticleParams(req.body);
      const { article, notification } = await ArticleService.annulingPublished(
        params
      );
      const userName = article.user.name;
      res.status(200).json({
        message: `Article's Takedown is successfully, the warning notification have been sent to ${userName}`,
        data: article,
        notification,
      });
    } catch (err) {
      next(err);
    }
  }

  static async hardDeleteArticleAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = parseHardDeleteArticeParams(req.body);
      const { article, notification } =
        await ArticleService.hardDeleteArticleAdmin(params);
      const username = article.user.name;
      res.status(200).json({
        message: `Article's Deletion is successfully, the warning notification have been sent to ${username}`,
        data: article,
        notification,
      });
    } catch (err) {
      next(err);
    }
  }

  static async postNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = parsePostNotificationParams(req.body);
      const notification = await ArticleService.postNotification(params);
      const username = notification.receiverName;
      res.status(400).json({
        message: `Article's Review is successfully, the review notification have been sent to ${username}`,
        notification,
      });
    } catch (err) {
      next(err);
    }
  }

  static async finishReview(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const params = parseFinishReviewParams(req.body);
      await ArticleService.finishReview(params);
      res.status(200).json({
        message:
          "Review Article ${articleName} is Finished, the publication notif have been sent to ${username}",
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ArticleController;
