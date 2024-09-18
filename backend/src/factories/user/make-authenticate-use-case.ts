import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../../use-cases/user/authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
