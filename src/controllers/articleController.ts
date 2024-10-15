import { Request, Response, NextFunction } from "express";
import ArticleService from "../services/articleService";

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
      console.log(err);
      next();
    }
  }
}

export default ArticleController;
