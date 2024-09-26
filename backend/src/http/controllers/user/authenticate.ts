import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../../factories/user/make-authenticate-use-case";
import { InvalidCredentialsError } from "../../../errors/invalid-credentials-error";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(14),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    return res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message });
    }
  }
}
