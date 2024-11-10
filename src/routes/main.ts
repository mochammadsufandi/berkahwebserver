import express from "express";
import articleRoute from "./articleRoute";
import authRoute from "./authRoutes";

const router = express.Router();

router.use(articleRoute);
router.use(authRoute);

export default router;
