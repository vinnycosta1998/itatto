import type { FastifyInstance } from 'fastify'
import { register } from '../http/controllers/user/register'
import { authenticate } from '../http/controllers/user/authenticate'
import { getUserProfile } from '../http/controllers/user/get-profile'
import { createTatto } from '../http/controllers/tattoo/create-tattoo'
import { deleteTattoo } from '../http/controllers/tattoo/delete-tattoo'
import { SearchManyTattoo } from '../http/controllers/tattoo/search-many-tattoo'

export async function appRoutes(app: FastifyInstance) {
  // User routes
  app.post('/register', register)
  app.post('/authenticate', authenticate)
  app.get('/me', getUserProfile)

  // Tatto routes
  app.post('/create-tattoo', createTatto)
  app.delete('/delete-tattoo', deleteTattoo)
  app.post('/search-tattoo', SearchManyTattoo)
}
