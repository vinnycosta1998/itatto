import { PrismaTattoosRepository } from '../../repositories/prisma/prisma-tatto-rerpository'
import { UpdateImageTattoUseCase } from '../../use-cases/tatto/update-image-tatto'

export function makeUpdateImageTattooUseCase() {
  const tattooRepository = new PrismaTattoosRepository()

  const useCase = new UpdateImageTattoUseCase(tattooRepository)

  return useCase
}
