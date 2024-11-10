export interface Notification {
  articleId: number;
  receiverId: number;
  senderId: number;
  message: string;
  category: string;
  finishStatus: string;
}
