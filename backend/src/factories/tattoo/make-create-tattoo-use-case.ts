import { PrismaTattoosRepository } from '../../repositories/prisma/prisma-tatto-rerpository'
import { CreateTattoUseCase } from '../../use-cases/tatto/create-tattoo'

export function makeCreateTattoo() {
  const tattooRepository = new PrismaTattoosRepository()

  const useCase = new CreateTattoUseCase(tattooRepository)

  return useCase
}
