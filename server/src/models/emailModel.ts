import mongoose, { type Document, Schema } from "mongoose";

// Uppercase the first letter for keys to keep consistency with API responses
const emailSchema = new Schema(
  {
    From: {
      type: String,
      required: true,
      index: true,
    },
    To: {
      type: String,
      required: true,
      index: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    Body: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      enum: ["sent", "received"],
      required: true,
    },
    StatusCode: {
      type: Number,
      enum: [200, 401, 413, 422, 429, 500, 503],
    },
    ErrorCode: {
      type: Number,
      default: null,
    },
    ErrorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export interface IEmail extends Document {
  From: string;
  To: string;
  Subject: string;
  Body: string;
  Type: "sent" | "received";
  StatusCode?: number;
  ErrorCode?: number;
  ErrorMessage?: string;
}

export const Email = mongoose.model<IEmail>("Email", emailSchema);
