import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const category = [
  {
    name: "Common Science",
  },
  {
    name: "Politics",
  },
  {
    name: "Physics",
  },
  {
    name: "Chemistry",
  },
];

const user = [
  {
    name: "Sufandi",
    email: "sufandi1@gmail.com",
    password: "sufandi1",
    role: "admin",
    imageURL: "https://localhost:3000/api/images/user/sufandi1.jpg",
  },
  {
    name: "Mukhlis",
    email: "mukhlis1@gmail.com",
    password: "mukhlis1",
    role: "user",
    imageURL: "https://localhost:3000/api/images/user/mukhlis1.jpg",
  },
];

const article = [
  {
    title: "Quantum Physics",
    content:
      "Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak",
    imageURL: "https://localhost:3000/api/images/article/qiupy.jpg",
    isFinished: true,
    isWorthyShowing: true,
    isDelete: false,
    categoryId: 3,
    userId: 2,
  },
  {
    title: "Beginning of Nazi",
    content:
      "Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak",
    imageURL: "https://localhost:3000/api/images/article/nazi.jpg",
    isFinished: true,
    isWorthyShowing: true,
    isDelete: false,
    categoryId: 2,
    userId: 2,
  },
  {
    title: "Indonesian Economy",
    content:
      "Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak",
    imageURL: "https://localhost:3000/api/images/article/IEE.jpg",
    isFinished: true,
    isWorthyShowing: true,
    isDelete: false,
    categoryId: 1,
    userId: 2,
  },
  {
    title: "Atomic Structure",
    content:
      "Lorem ipsum, atau ringkasnya lipsum, adalah teks standar yang ditempatkan untuk mendemostrasikan elemen grafis atau presentasi visual seperti font, tipografi, dan tata letak",
    imageURL: "https://localhost:3000/api/images/article/atom.jpg",
    isFinished: true,
    isWorthyShowing: true,
    isDelete: false,
    categoryId: 4,
    userId: 1,
  },
];

const notification = [
  {
    message:
      "Please check this typo, you can contact us for next question on email",
    category: "revision",
    finishStatus: "not read",
    receiverId: 2,
    senderId: 1,
    articleId: 1,
  },
  {
    message:
      "We're sorry for taking down your article because of due to violating applicable term and conditions",
    category: "takedown",
    finishStatus: "read",
    receiverId: 2,
    senderId: 1,
    articleId: 2,
  },
];

const bookmark = [
  {
    articleId: 1,
    userId: 1,
  },
  {
    articleId: 2,
    userId: 1,
  },
  {
    articleId: 3,
    userId: 2,
  },
  {
    articleId: 4,
    userId: 2,
  },
];

const like = [
  {
    articleId: 1,
    userId: 1,
  },
  {
    articleId: 3,
    userId: 1,
  },
  {
    articleId: 4,
    userId: 2,
  },
  {
    articleId: 3,
    userId: 2,
  },
];

const view = [
  {
    articleId: 1,
    userId: 1,
  },
  {
    articleId: 1,
    userId: 2,
  },
  {
    articleId: 2,
    userId: 1,
  },
  {
    articleId: 2,
    userId: 2,
  },
  {
    articleId: 3,
    userId: 1,
  },
  {
    articleId: 3,
    userId: 2,
  },
  {
    articleId: 4,
    userId: 1,
  },
  {
    articleId: 4,
    userId: 2,
  },
];

export const main = async (): Promise<void> => {
  await prisma.category.createMany({
    data: category,
  });

  await prisma.user.createMany({
    data: user,
  });

  await prisma.article.createMany({
    data: article,
  });

  await prisma.notification.createMany({
    data: notification,
  });

  await prisma.bookmark.createMany({
    data: bookmark,
  });

  await prisma.like.createMany({
    data: like,
  });

  await prisma.view.createMany({
    data: view,
  });
};

main();
