import { type Router } from 'express'

export interface ApiPath {
  path: string
  handler: Router
}
