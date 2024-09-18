import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteTattoo } from '../../../factories/tattoo/make-delete-tattoo-use-case'

export async function deleteTattoo(req: FastifyRequest, res: FastifyReply) {
  const deleteTattooBodySchema = z.object({
    id: z.string()
  })

  const { id } = deleteTattooBodySchema.parse(req.body)

  try {
    const deleteTattooUseCase = makeDeleteTattoo()

    await deleteTattooUseCase.execute({
      id
    })
  } catch (err) {
    console.error(err)
  }
}
