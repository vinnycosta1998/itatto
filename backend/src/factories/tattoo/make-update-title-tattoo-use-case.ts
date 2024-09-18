import { PrismaTattoosRepository } from '../../repositories/prisma/prisma-tatto-rerpository'
import { UpdateTitleTattoUseCase } from '../../use-cases/tatto/update-title-tattoo'

export function makeUpdateTitleTattoo() {
  const tattooRepository = new PrismaTattoosRepository()

  const useCase = new UpdateTitleTattoUseCase(tattooRepository)

  return useCase
}
