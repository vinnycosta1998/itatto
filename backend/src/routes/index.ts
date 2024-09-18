import type { FastifyInstance } from 'fastify'
import { app } from '../app'
import { register } from '../http/controllers/register'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
}
