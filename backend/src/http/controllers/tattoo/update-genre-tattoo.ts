import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateGenreTattooUseCase } from '../../../factories/tattoo/make-update-image-tattoo-use-case'

export async function updateGenreTattoo(
  req: FastifyRequest,
  res: FastifyReply
) {
  const updateGenreTattooBodySchema = z.object({
    id: z.string(),
    genre: z.string().min(2).max(24)
  })

  const { id, genre } = updateGenreTattooBodySchema.parse(req.body)

  try {
    const updateGenreTattooUseCase = makeUpdateGenreTattooUseCase()

    await updateGenreTattooUseCase.execute({
      id,
      genre
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}
