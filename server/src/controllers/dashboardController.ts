import { Request, Response, NextFunction } from "express";
import Visitor from "../modules/visitor.schema";

/**
 * Get Dashboard Stats
 */
export const getDashboardStats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const totalAll = await Visitor.countDocuments();
        const totalToday = await Visitor.countDocuments({
            entryTime: { $gte: todayStart },
        });
        const inside = await Visitor.countDocuments({ status: "Entered" });
        const exited = await Visitor.countDocuments({ status: "Exited" });
        const deleted = await Visitor.countDocuments({ status: "Deleted" });

        // Weekly trends: visitors per day for the last 7 days
        const weeklyTrends = [];
        const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        for (let i = 6; i >= 0; i--) {
            const dayStart = new Date();
            dayStart.setDate(dayStart.getDate() - i);
            dayStart.setHours(0, 0, 0, 0);

            const dayEnd = new Date(dayStart);
            dayEnd.setHours(23, 59, 59, 999);

            const count = await Visitor.countDocuments({
                entryTime: { $gte: dayStart, $lte: dayEnd },
            });

            weeklyTrends.push({
                day: days[dayStart.getDay()],
                visitors: count,
            });
        }

        // Status distribution for donut chart
        const statusDistribution = [
            { name: "Inside Campus", value: inside, color: "#6366f1" },
            { name: "Exited / Off-site", value: exited, color: "#3b82f6" },
            { name: "Deleted", value: deleted, color: "#e2e8f0" },
        ];

        // Efficiency = exited / (total non-deleted) * 100
        const activeTotal = inside + exited;
        const efficiency = activeTotal > 0 ? Math.round((exited / activeTotal) * 100) : 0;

        res.status(200).json({
            success: true,
            data: {
                totalAll,
                totalToday,
                inside,
                exited,
                deleted,
                weeklyTrends,
                statusDistribution,
                efficiency,
            },
        });
    } catch (error) {
        next(error);
    }
};
