import { Notification } from "./NotifInterface";

// Article Admin
export interface getIsDeleteArticleParams {
  isDelete: boolean;
}

export interface getIsWorthyShowingArticleParams {
  isWorthyShowing: boolean;
}

export interface getIsFinishedArticleParams {
  isFinished: boolean;
}

export interface AnnulingArticleParams extends Notification {
  isWorthyShowing: boolean;
}

export interface HardDeleteArticleParams extends Notification {}

export interface ReviewRevisionNotificationParams extends Notification {}

export interface FinishReviewParams extends Notification {
  isWorthyShowing: boolean;
}

// Register Params
export interface RegisterParams {
  name: string;
  email: string;
  password: string;
  role: string;
  image: Express.Multer.File[];
}

// Login Params
export interface LoginParams {
  email: string;
  password: string;
}

// Bcrypt Params
export interface BcryptParams {
  password: string;
  hashedPassword: string;
}

// Jwt Params
export interface UserPayload {
  id: number;
  email: string;
  role: string;
}
