export type EmailType = "received" | "sent";

export type Email = {
  _id: string;
  From: string;
  To: string;
  Subject: string;
  Body: string;
  Type: EmailType;
  ErrorCode: string | null;
  ErrorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
