import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import controllers from '@controllers'
import db from '@db'
import logger from '@utils/logger'
import { PORT } from '@config'
import { bootstrapWebhooks } from './services/postmark'

const log = logger(module)

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cors())

controllers.forEach((c) => app.use(c.path, c.handler))

app.use((err, _req, res, _next) => {
  if (err && typeof err.message === 'string') {
    log.error('General Error: ' + err.message)
    res.status(500).json({ error: err.message })
  } else {
    res.status(500).json({ error: 'An unexpected error occurred' })
  }
})

bootstrapWebhooks().then(() => {
  log.info('Webhooks bootstrapped')
})

app.listen(PORT, async () => {
  await db()
  log.info(`Server listening on port ${PORT}`)
})
