import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ArticleWithDetails } from "./interface";

class ArticleService {
  static async getAllArticleAdmin(): Promise<ArticleWithDetails[]> {
    const articles = await prisma.article.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            like: true,
            view: true,
          },
        },
      },
    });
    return articles;
  }
}

export default ArticleService;
