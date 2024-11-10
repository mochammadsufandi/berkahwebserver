export interface Article {
  id: number;
  title: string;
  content: string;
  imageURL: string | null;
  isFinished: boolean;
  isWorthyShowing: boolean;
  isDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  userId: number;
}

export interface User {
  name: string;
}

export interface Count {
  like: number;
  view: number;
}
