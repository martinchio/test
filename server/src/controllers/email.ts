import express from "express";

import { validateEmailData } from "@middleware/validateEmail";
import { auth } from "@middleware/auth";
import {
  sendEmail,
  getEmails,
  getEmail,
  getEmailByAddress,
} from "@services/email";
import { type EmailMessage } from "@ctypes/email";

const router = express.Router();

router.post("/", [validateEmailData, auth], async (req, res, next) => {
  try {
    const emailData: EmailMessage = req.body;
    const email = await sendEmail(emailData);
    res.status(200).json({ message: "Email sent successfully", id: email });
  } catch (error) {
    next(error);
  }
});

router.get("", auth, async (req, res, next) => {
  try {
    const type = req.query.type as string;
    const emails = await getEmails(type);
    res.status(200).json(emails);
  } catch (error) {
    next(error);
  }
});

router.get("/address/:address", auth, async (req, res, next) => {
  try {
    const emails = await getEmailByAddress(req.params.address);
    res.status(200).json(emails);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const email = await getEmail(req.params.id);
    res.status(200).json(email);
  } catch (error) {
    next(error);
  }
});

export default router;
