import express from 'express'
import { saveEmail } from '@services/email'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const { body } = req
    await saveEmail({
      To: 'us',
      From: body.Recipient,
      Subject: body.RecordType,
      TextBody: `Inbound webhook of type ${body.RecordType}, MessageID: ${body.MessageID}, DeliveredAt: ${body.DeliveredAt}`,
      type: 'received'
    })
    res.status(200).json({ message: 'Webhook received' })
  } catch (error) {
    next(error)
  }
})

export default router
