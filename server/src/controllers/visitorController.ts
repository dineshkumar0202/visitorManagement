import { Request, Response, NextFunction } from "express";
import Visitor from "../modules/visitor.schema";

/**
 * Add Visitor
 */
export const addVisitor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phone, flatNumber, address, purpose } = req.body;

    const visitor = await Visitor.create({
      name,
      phone,
      flatNumber,
      address,
      purpose,
    });

    res.status(201).json({
      success: true,
      message: "Visitor added successfully",
      data: visitor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Visitors (Search + Pagination)
 */
export const getVisitors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, search = "", status = "" } = req.query;

    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { flatNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const visitors = await Visitor.find(query)
      .sort({ entryTime: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Visitor.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Visitors fetched successfully",
      data: visitors,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Single Visitor
 */
export const getVisitorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: visitor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mark Exit
 */
export const markExit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    if (visitor.status === "Exited") {
      return res.status(400).json({
        success: false,
        message: "Visitor already exited",
      });
    }

    visitor.exitTime = new Date();
    visitor.status = "Exited";

    await visitor.save();

    res.status(200).json({
      success: true,
      message: "Visitor marked as exited",
      data: visitor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete Visitor
 */
export const deleteVisitor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    visitor.status = "Deleted";
    await visitor.save();

    res.status(200).json({
      success: true,
      message: "Visitor marked as deleted",
    });
  } catch (error) {
    next(error);
  }
};