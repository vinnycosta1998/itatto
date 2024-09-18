import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateTitleTattoo } from '../../../factories/tattoo/make-update-title-tattoo-use-case'

export async function updateDescriptionTattoo(
  req: FastifyRequest,
  res: FastifyReply
) {
  const updateDescriptionTattooBodySchema = z.object({
    id: z.string(),
    title: z.string().min(2).max(60)
  })

  const { id, title } = updateDescriptionTattooBodySchema.parse(req.body)

  try {
    const updateDescriptionTattoUseCase = makeUpdateTitleTattoo()

    await updateDescriptionTattoUseCase.execute({
      id,
      title
    })
  } catch (err) {
    console.error(err)
    throw err
  }
}
