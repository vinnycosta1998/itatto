import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetUserProfile } from '../../../factories/user/make-get-user-profile-use-case'

export async function getUserProfile(req: FastifyRequest, res: FastifyReply) {
  const profileBodySchema = z.object({
    id: z.string()
  })

  const { id } = profileBodySchema.parse(req.body)

  try {
    const getProfileUseCase = makeGetUserProfile()

    await getProfileUseCase.execute({
      id
    })
  } catch (err) {
    console.error(err)
  }
}
