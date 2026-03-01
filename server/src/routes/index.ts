import { Router } from "express";
import authRoutes from "./authRoutes";
import visitorRoutes from "./visitorRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/visitors", visitorRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;