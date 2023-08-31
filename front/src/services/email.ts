import axios from "axios";

import { EmailType, NewEmail } from "@/types/email";

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

export async function getEmail(id: string, pass: string) {
  const response = await serverInstance.get(
    `/email/${id}`,
    createAuthHeader(pass),
  );
  return response.data;
}

export async function sendEmail(
  { From, To, TextBody, Subject }: NewEmail,
  pass: string,
) {
  const response = await serverInstance.post(
    "/email",
    { From, To, TextBody, Subject },
    createAuthHeader(pass),
  );
  return response.data;
}
