import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteTattooUseCase } from '../../../factories/tattoo/make-delete-tattoo-use-case'

export async function deleteTatto(req: FastifyRequest, res: FastifyReply) {
  const deleteTattooBodySchema = z.object({
    id: z.string()
  })

  const { id } = deleteTattooBodySchema.parse(req.body)

  try {
    const deleteTattooUseCase = makeDeleteTattooUseCase()

    await deleteTattooUseCase.execute({
      id
    })
  } catch (err) {
    console.error(err)
  }
}
