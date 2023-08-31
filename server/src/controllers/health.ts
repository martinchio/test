import express from 'express'
const router = express.Router()

router.get('/', (_req, res) => {
  res.status(200).json({ message: 'Server is up and running' })
})

export default router
