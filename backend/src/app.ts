import fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import multipart from '@fastify/multipart'

import { env } from './env'
import { ZodError } from 'zod'
import { appRoutes } from './routes'
import {fastifyStatic} from '@fastify/static'
import path from 'path'

export const app = fastify({
  logger: true
})
// add .. from out src
app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
})

console.log(path.join(__dirname, 'public'))

app.register(cors, {
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'Accept', 'Origin', 'X-Requested-With'],
  allowedHeaders: ['Content-Type', 'Authorization',]
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(multipart, {
  limits: {
    files: 1,
    fileSize: 300000
  }
})

app.register(appRoutes)

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
