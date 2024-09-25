import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository";
import { UpdatePasswordUseCase } from "../../use-cases/user/update-password";

export function makeUpdatePassword() {
  const usersRepository = new PrismaUsersRepository();

  const useCase = new UpdatePasswordUseCase(usersRepository);

  return useCase;
}
