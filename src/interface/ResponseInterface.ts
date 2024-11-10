import { Article, User, Count } from "./ArticleInterface";
import { Notification } from "./NotifInterface";

// Article Admin Response
export interface ArticleWithDetailsResponse extends Article {
  user: User;
  _count: Count;
}

export interface NotificationResponse
  extends Omit<Notification, "receiverId" | "senderId"> {
  senderName: string;
  receiverName: string;
}

export interface AnnulingArticleResponse {
  article: ArticleWithDetailsResponse;
  notification: NotificationResponse;
}

export interface HardDeleteArticleResponse {
  article: ArticleWithDetailsResponse;
  notification: NotificationResponse;
}

export interface FinishReviewResponse {
  article: ArticleWithDetailsResponse;
  notification: NotificationResponse;
}
