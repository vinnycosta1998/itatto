import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeSearchManytattoUseCase } from '../../../factories/tattoo/make-search-many-tattoo-use-case'

export async function SearchManyTattoo(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const searchmanyTattoBodyschema = z.object({
    query: z.string(),
    page: z.coerce.number()
  })

  const { query, page } = searchmanyTattoBodyschema.parse(req.body)

  try {
    const searchManyTattooUseCase = makeSearchManytattoUseCase()

    await searchManyTattooUseCase.execute({ query, page })
  } catch (err) {
    console.error(err)
    throw err
  }
}
