import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdatePassword } from "../../../factories/user/make-update-password";
import { UserNotFoundError } from "../../../errors/user-not-found-error";
import { PasswordLenghtError } from "../../../errors/password-length-error";

export async function updatePassword(req: FastifyRequest, res: FastifyReply) {
  const updatePasswordBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(14),
  });

  const { email, password } = updatePasswordBodySchema.parse(req.body);

  try {
    const updatePasswordUseCase = makeUpdatePassword();

    await updatePasswordUseCase.execute({
      email,
      newPassword: password,
    });
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return res.status(404).send({ message: "User not found" });
    }

    if (err instanceof PasswordLenghtError) {
      return res
        .status(400)
        .send({ message: "Password lenght is not correct" });
    }

    console.error(err);
  }
}
