import { config } from "dotenv";
config();

export const {
  PORT,
  DB_STRING,
  POSTMARK_SERVER_TOKEN,
  AUTH_API_KEY,
  WEBHOOK_URL,
  POSTMARK_USER,
  POSTMARK_PASSWORD,
} = process.env;
