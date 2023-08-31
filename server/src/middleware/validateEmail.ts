import { type Request, type Response, type NextFunction } from 'express'

export function validateEmailData (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requiredFields = ['From', 'To', 'Subject', 'TextBody']

  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res
        .status(400)
        .json({ error: `Missing required field: ${field}` })
    }
  }

  next()
}
