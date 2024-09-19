import fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './env'
import { ZodError } from 'zod'
import { appRoutes } from './routes'

export const app = fastify()

app.register(appRoutes)

app.register(cors, {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
