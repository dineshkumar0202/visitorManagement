import mongoose, { Schema, Document } from "mongoose";

export interface IVisitor extends Document {
  name: string;
  phone: string;
  flatNumber: string;
  address?: string;
  purpose: string;
  entryTime: Date;
  exitTime?: Date;
  status: string;
}

const VisitorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    flatNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    purpose: {
      type: String,
    },
    entryTime: {
      type: Date,
      default: Date.now,   // auto-generate entry time
    },
    exitTime: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Entered", "Exited", "Deleted"],
      default: "Entered",   // default status
    },
  },
  { timestamps: true }
);

export default mongoose.model<IVisitor>("Visitor", VisitorSchema);