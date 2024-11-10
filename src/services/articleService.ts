import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
import {
  AnnulingArticleResponse,
  ArticleWithDetailsResponse,
  FinishReviewResponse,
  HardDeleteArticleResponse,
  NotificationResponse,
} from "../interface/ResponseInterface";
import { CustomResponseError } from "../middleware/errorClass/errorClass";
import {
  AnnulingArticleParams,
  FinishReviewParams,
  getIsDeleteArticleParams,
  getIsFinishedArticleParams,
  getIsWorthyShowingArticleParams,
  HardDeleteArticleParams,
  ReviewRevisionNotificationParams,
} from "../interface/ParamsInterface";

class ArticleService {
  static async getAllArticleAdmin(): Promise<ArticleWithDetailsResponse[]> {
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

  static async getFinishArticleAdmin(
    params: getIsFinishedArticleParams
  ): Promise<ArticleWithDetailsResponse[]> {
    const { isFinished } = params;
    const articles = await prisma.article.findMany({
      where: {
        isFinished: isFinished,
      },
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

  static async getIsWorthyShowingArticleAdmin(
    params: getIsWorthyShowingArticleParams
  ): Promise<ArticleWithDetailsResponse[]> {
    const { isWorthyShowing } = params;
    const articles = await prisma.article.findMany({
      where: {
        isWorthyShowing: isWorthyShowing,
      },
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

  static async getIsDeleteArticleAdmin(
    params: getIsDeleteArticleParams
  ): Promise<ArticleWithDetailsResponse[]> {
    const { isDelete } = params;
    const articles = await prisma.article.findMany({
      where: {
        isDelete: isDelete,
      },
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

  static async annulingPublished(
    params: AnnulingArticleParams
  ): Promise<AnnulingArticleResponse> {
    const {
      articleId,
      receiverId,
      senderId,
      isWorthyShowing,
      message,
      category,
      finishStatus,
    } = params;

    if (!articleId || !receiverId || !senderId) {
      throw new CustomResponseError({
        name: "Invalid Input Type",
        statusCode: 400,
        message: "Please Input the Right Field",
      });
    }
    if (
      isWorthyShowing === undefined ||
      !message ||
      !category ||
      !finishStatus
    ) {
      throw new CustomResponseError({
        name: "Invalid Input Type",
        statusCode: 400,
        message: "Please Input All Required Field for Notification",
      });
    }
    const existingArticle = await prisma.article.findUnique({
      where: {
        id: +articleId,
      },
    });
    const sender = (await prisma.user.findUnique({
      where: { id: +senderId },
      select: { name: true },
    })) as User | null;
    const receiver = await prisma.user.findUnique({
      where: { id: +receiverId },
    });

    if (!existingArticle) {
      throw new CustomResponseError({
        name: "NotFoundArticle",
        statusCode: 400,
        message: `Article with id ${articleId} is not found`,
      });
    }
    console.log(existingArticle.isWorthyShowing);
    if (!existingArticle.isWorthyShowing) {
      throw new CustomResponseError({
        name: "Activity is Not Allowed",
        statusCode: 400,
        message: "Article has been suspended, you can't suspend again",
      });
    }
    if (!sender) {
      throw new CustomResponseError({
        name: "NotFoundUser",
        statusCode: 400,
        message: "Admin is Not Found",
      });
    }

    if (!receiver) {
      throw new CustomResponseError({
        name: "NotFoundUser",
        statusCode: 400,
        message: "User is Not Found",
      });
    }

    if (+receiverId !== existingArticle.userId) {
      throw new CustomResponseError({
        name: "UserID Mismatch",
        statusCode: 400,
        message: "Incompatibility User Id",
      });
    }

    const result = await prisma.$transaction(async (prisma) => {
      const article = await prisma.article.update({
        where: {
          id: +articleId,
        },
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
        data: {
          isWorthyShowing: isWorthyShowing,
        },
      });

      const notificationDB = await prisma.notification.create({
        data: {
          articleId: +articleId,
          receiverId: +receiverId,
          senderId: +senderId,
          message: message,
          category: category,
          finishStatus: finishStatus,
        },
      });

      const notification = {
        id: +notificationDB.id,
        articleId: +notificationDB.articleId,
        senderName: sender?.name,
        receiverName: receiver?.name,
        message: notificationDB.message,
        category: notificationDB.category,
        finishStatus: notificationDB.finishStatus,
      };

      return { article, notification };
    });

    const { article, notification } = result;
    return { article, notification };
  }

  static async hardDeleteArticleAdmin(
    params: HardDeleteArticleParams
  ): Promise<HardDeleteArticleResponse> {
    const { articleId, message, category, finishStatus, senderId, receiverId } =
      params;

    if (!articleId || !senderId || !receiverId) {
      throw new CustomResponseError({
        name: "Invalid Input Type",
        statusCode: 400,
        message: "Please Input The Right Field",
      });
    }

    if (!message || !category || !finishStatus) {
      throw new CustomResponseError({
        name: "Invalid Input Type",
        statusCode: 400,
        message: "Please Input All Required Field",
      });
    }

    const existingArticle = await prisma.article.findUnique({
      where: {
        id: +articleId,
      },
    });
    const sender = (await prisma.user.findUnique({
      where: {
        id: +senderId,
      },
    })) as User | null;
    const receiver = (await prisma.user.findUnique({
      where: {
        id: +receiverId,
      },
    })) as User | null;

    if (!existingArticle) {
      throw new CustomResponseError({
        name: "NotFoundArticle",
        statusCode: 400,
        message: `Article with id ${articleId} is Not Found`,
      });
    }
    if (!sender) {
      throw new CustomResponseError({
        name: "NotFoundUser",
        statusCode: 400,
        message: "Admin is Not Found",
      });
    }
    if (!receiver) {
      throw new CustomResponseError({
        name: "NotFoundUser",
        statusCode: 400,
        message: "User is Not Found",
      });
    }

    if (+receiverId !== existingArticle.userId) {
      throw new CustomResponseError({
        name: "UserID Mismatch",
        statusCode: 400,
        message: "Incompatibility User Id",
      });
    }

    const result = await prisma.$transaction(async (prisma) => {
      const notificationDB = await prisma.notification.create({
        data: {
          articleId: +articleId,
          receiverId: +receiverId,
          senderId: +senderId,
          message: message,
          category: category,
          finishStatus: finishStatus,
        },
      });

      const deletedArticle = await prisma.article.delete({
        where: { id: +articleId },
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

      const notification = {
        id: +notificationDB.id,
        articleId: +notificationDB.articleId,
        senderName: sender?.name,
        receiverName: receiver?.name,
        message: notificationDB.message,
        category: notificationDB.category,
        finishStatus: notificationDB.finishStatus,
      };

      return {
        article: deletedArticle,
        notification,
      };
    });
    return result;
  }

  static async postNotification(
    params: ReviewRevisionNotificationParams
  ): Promise<NotificationResponse> {
    const { articleId, message, category, finishStatus, senderId, receiverId } =
      params;

    if (!articleId || !senderId || !receiverId) {
      throw new CustomResponseError({
        name: "Invalid Input Type",
        statusCode: 400,
        message: "Please Input The Right Field",
      });
    }

    if (!message || !category || !finishStatus) {
      throw new CustomResponseError({
        name: "Invalid Input Type",
        statusCode: 400,
        message: "Please Input All Required Field",
      });
    }

    const existingArticle = await prisma.article.findUnique({
      where: {
        id: +articleId,
      },
    });
    const sender = (await prisma.user.findUnique({
      where: {
        id: +senderId,
      },
    })) as User | null;
    const receiver = (await prisma.user.findUnique({
      where: {
        id: +receiverId,
      },
    })) as User | null;

    if (!existingArticle) {
      throw new CustomResponseError({
        name: "NotFoundArticle",
        statusCode: 400,
        message: `Article with id ${articleId} is Not Found`,
      });
    }
    if (!sender) {
      throw new CustomResponseError({
        name: "NotFoundUser",
        statusCode: 400,
        message: "Admin is Not Found",
      });
    }
    if (!receiver) {
      throw new CustomResponseError({
        name: "NotFoundUser",
        statusCode: 400,
        message: "User is Not Found",
      });
    }

    if (receiverId !== existingArticle.userId) {
      throw new CustomResponseError({
        name: "UserID Mismatch",
        statusCode: 400,
        message: "Incompatibility User Id",
      });
    }

    const notificationDB = await prisma.notification.create({
      data: {
        articleId: +articleId,
        receiverId: +receiverId,
        senderId: +senderId,
        message: message,
        category: category,
        finishStatus: finishStatus,
      },
    });

    const notification = {
      id: +notificationDB.id,
      articleId: +notificationDB.articleId,
      senderName: sender?.name,
      receiverName: receiver?.name,
      message: notificationDB.message,
      category: notificationDB.category,
      finishStatus: notificationDB.finishStatus,
    };

    return notification;
  }

  static async finishReview(
    params: FinishReviewParams
  ): Promise<FinishReviewResponse> {
    const {
      articleId,
      message,
      category,
      finishStatus,
      senderId,
      receiverId,
      isWorthyShowing,
    } = params;

    if (!articleId || !senderId || !receiverId) {
      throw new CustomResponseError({
        name: "Invalid Input Type",
        statusCode: 400,
        message: "Please Input The Right Field",
      });
    }

    if (
      !message ||
      !category ||
      !finishStatus ||
      isWorthyShowing === null ||
      undefined
    ) {
      throw new CustomResponseError({
        name: "Invalid Input Type",
        statusCode: 400,
        message: "Please Input All Required Field",
      });
    }

    const existingArticle = await prisma.article.findUnique({
      where: {
        id: +articleId,
      },
    });
    const sender = (await prisma.user.findUnique({
      where: {
        id: +senderId,
      },
    })) as User | null;
    const receiver = (await prisma.user.findUnique({
      where: {
        id: +receiverId,
      },
    })) as User | null;

    if (!existingArticle) {
      throw new CustomResponseError({
        name: "NotFoundArticle",
        statusCode: 400,
        message: `Article with id ${articleId} is Not Found`,
      });
    }

    if (existingArticle.isWorthyShowing) {
      throw new CustomResponseError({
        name: "Activity is Not Allowed",
        statusCode: 400,
        message: "Article has been accepted, you can't accept again",
      });
    }
    if (!sender) {
      throw new CustomResponseError({
        name: "NotFoundUser",
        statusCode: 400,
        message: "Admin is Not Found",
      });
    }
    if (!receiver) {
      throw new CustomResponseError({
        name: "NotFoundUser",
        statusCode: 400,
        message: "User is Not Found",
      });
    }

    if (receiverId !== existingArticle.userId) {
      throw new CustomResponseError({
        name: "UserID Mismatch",
        statusCode: 400,
        message: "Incompatibility User Id",
      });
    }

    const result = await prisma.$transaction(async (prisma) => {
      const article = await prisma.article.update({
        where: {
          id: +articleId,
        },
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
        data: {
          isWorthyShowing: isWorthyShowing,
        },
      });

      const notificationDB = await prisma.notification.create({
        data: {
          articleId: +articleId,
          receiverId: +receiverId,
          senderId: +senderId,
          message: message,
          category: category,
          finishStatus: finishStatus,
        },
      });

      const notification = {
        id: +notificationDB.id,
        articleId: +notificationDB.articleId,
        senderName: sender?.name,
        receiverName: receiver?.name,
        message: notificationDB.message,
        category: notificationDB.category,
        finishStatus: notificationDB.finishStatus,
      };

      return { article, notification };
    });

    const { article, notification } = result;
    return { article, notification };
  }
}

export default ArticleService;
