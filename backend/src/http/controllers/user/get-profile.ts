import type { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfile } from "../../../factories/user/make-get-user-profile-use-case";

export async function getUserProfile(req: FastifyRequest, res: FastifyReply) {
  const id = req.user.id;

  try {
    const getProfileUseCase = makeGetUserProfile();

    await getProfileUseCase.execute({
      id,
    });
  } catch (err) {
    console.error(err);
  }
}
