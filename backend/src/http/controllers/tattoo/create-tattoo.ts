import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateTattoo } from '../../../factories/tattoo/make-create-tattoo-use-case'
import { DescriptionHasLongError } from '../../../errors/description-has-long-error'

export async function createTatto(req: FastifyRequest, res: FastifyReply) {
  const createTattooBodyschema = z.object({
    title: z.string().min(2).max(24),
    description: z.string().min(2).max(60),
    genre: z.string(),
    image: z.string()
  })

  const { title, description, genre, image } = createTattooBodyschema.parse(
    req.body
  )

  try {
    const createTattooUseCase = makeCreateTattoo()

    await createTattooUseCase.execute({
      title,
      description,
      genre,
      image
    })
  } catch (err) {
    if (err instanceof DescriptionHasLongError) {
      return res.status(413).send({ message: 'Payload too large' })
    }

    throw err
  }
}
