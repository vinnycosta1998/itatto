import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateDescriptiontattoUseCase } from '../../../factories/tattoo/make-update-description-tattoo-use-case'

export async function updateDescriptionTattoo(
  req: FastifyRequest,
  res: FastifyReply
) {
  const updateDescriptionTattooBodySchema = z.object({
    id: z.string(),
    description: z.string().min(2).max(60)
  })

  const { id, description } = updateDescriptionTattooBodySchema.parse(req.body)

  try {
    const updateDescriptionTattoUseCase = makeUpdateDescriptiontattoUseCase()

    await updateDescriptionTattoUseCase.execute({
      id,
      description
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}
