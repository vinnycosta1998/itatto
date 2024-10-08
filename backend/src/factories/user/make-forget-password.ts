import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { ForgetPasswordUseCase } from '../../use-cases/user/forget-password'

export function makeForgetPassword() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new ForgetPasswordUseCase(usersRepository)

  return useCase
}
