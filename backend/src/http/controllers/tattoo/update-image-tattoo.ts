import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateImageTattoo } from '../../../factories/tattoo/make-update-image-tattoo-use-case'

export async function updateImageTattoo(
  req: FastifyRequest,
  res: FastifyReply
) {
  const updateImageTattooBodySchema = z.object({
    id: z.string(),
    image: z.string()
  })

  const { id, image } = updateImageTattooBodySchema.parse(req.body)

  try {
    const updateImageTattooUseCase = makeUpdateImageTattoo()

    await updateImageTattooUseCase.execute({
      id,
      image
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}
