import type { FastifyInstance } from 'fastify'
import { register } from '../http/controllers/register'
import { authenticate } from '../http/controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)
}
