import { PrismaTattoosRepository } from '../../repositories/prisma/prisma-tatto-rerpository'
import { DeleteTattooUseCase } from '../../use-cases/tatto/delete-tattoo'

export function makeDeleteTattoo() {
  const tattooRepository = new PrismaTattoosRepository()

  const useCase = new DeleteTattooUseCase(tattooRepository)

  return useCase
}
