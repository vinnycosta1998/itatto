import { PrismaUsersRepository } from '../repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../use-cases/user/register'

export function makeRegistereUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new RegisterUseCase(usersRepository)

  return useCase
}
