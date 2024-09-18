import type { FastifyInstance } from 'fastify'
import { register } from '../http/controllers/user/register'
import { authenticate } from '../http/controllers/user/authenticate'
import { getUserProfile } from '../http/controllers/user/get-profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/authenticate', authenticate)
  app.get('/me', getUserProfile)
}
