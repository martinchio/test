import { type Request, type Response, type NextFunction } from "express";

import { AUTH_API_KEY } from "@config";

// very simple authentication middleware, just checks for the presence of an api key
export function auth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["api-key"];

  if (!apiKey || apiKey !== AUTH_API_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  next();
}
