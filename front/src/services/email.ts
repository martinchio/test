import axios from "axios";
import { EmailType } from "@/types/email";

const serverInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const createAuthHeader = (pass: string) => ({
  headers: {
    "api-key": pass,
  },
});

export async function getEmails(type: EmailType = "received", pass: string) {
  const response = await serverInstance.get(
    `/email?type=${type}`,
    createAuthHeader(pass),
  );
  return response.data;
}
