import {
  FinishReviewParams,
  getIsDeleteArticleParams,
  getIsFinishedArticleParams,
  getIsWorthyShowingArticleParams,
  HardDeleteArticleParams,
  RegisterParams,
  ReviewRevisionNotificationParams,
} from "../interface/ParamsInterface";

export function parseGetIsDeleteArticleParams(
  body: any
): getIsDeleteArticleParams {
  return {
    isDelete: body.isDelete === "true",
  };
}

export function parseGetIsWorthyShowingArticleParams(
  body: any
): getIsWorthyShowingArticleParams {
  return {
    isWorthyShowing: body.isWorthyShowing === "true",
  };
}

export function parseGetIsFinishedArticleParams(
  body: any
): getIsFinishedArticleParams {
  return {
    isFinished: body.isFinished === "true",
  };
}

export function parseFinishReviewParams(body: any): FinishReviewParams {
  return {
    articleId: +body.articleId,
    receiverId: +body.receiverId,
    senderId: +body.senderId,
    message: body.message,
    category: body.category,
    finishStatus: body.finishStatus,
    isWorthyShowing: body.isWorthyShowing === "true",
  };
}

export function parsePostNotificationParams(
  body: any
): ReviewRevisionNotificationParams {
  return {
    articleId: +body.articleId,
    receiverId: +body.receiverId,
    senderId: +body.senderId,
    message: body.message,
    category: body.category,
    finishStatus: body.finishStatus,
  };
}

export function parseHardDeleteArticeParams(
  body: any
): HardDeleteArticleParams {
  return {
    articleId: +body.articleId,
    receiverId: +body.receiverId,
    senderId: +body.senderId,
    message: body.message,
    category: body.category,
    finishStatus: body.finishStatus,
  };
}

export function parseAnnulingArticleParams(body: any): FinishReviewParams {
  return {
    articleId: +body.articleId,
    receiverId: +body.receiverId,
    senderId: +body.senderId,
    message: body.message,
    category: body.category,
    finishStatus: body.finishStatus,
    isWorthyShowing: body.isWorthyShowing === "true",
  };
}

export function parseRegisterParams(body: any): RegisterParams {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role.toLowerCase(),
    imageURL: body.imageURL,
  };
}
