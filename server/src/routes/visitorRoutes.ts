// src/routes/visitor.routes.ts

import { Router } from "express";
import {
    addVisitor,
    getVisitors,
    getVisitorById,
    markExit,
    deleteVisitor,
} from "../controllers/visitorController";

import { protect } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router = Router();

/**
 * Add Visitor
 * Admin & Security allowed
 */
router.post(
    "/",
    protect,
    authorize("Admin", "Security"),
    addVisitor
);

/**
 * Get All Visitors (Search + Pagination)
 * Admin & Security allowed
 */
router.get(
    "/",
    protect,
    authorize("Admin", "Security"),
    getVisitors
);

/**
 * Get Single Visitor
 */
router.get(
    "/:id",
    protect,
    authorize("Admin", "Security"),
    getVisitorById
);

/**
 * Mark Exit
 * Admin & Security allowed
 */
router.patch(
    "/:id/exit",
    protect,
    authorize("Admin", "Security"),
    markExit
);

/**
 * Delete Visitor
 * Only Admin allowed
 */
router.delete(
    "/:id",
    protect,
    authorize("Admin"),
    deleteVisitor
);

export default router;