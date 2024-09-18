import { PrismaTattoosRepository } from '../../repositories/prisma/prisma-tatto-rerpository'
import { UpdateDescriptionTattoUseCase } from '../../use-cases/tatto/update-description-tattoo'

export function makeUpdateDescriptiontattoUseCase() {
  const tattooRepository = new PrismaTattoosRepository()

  const useCase = new UpdateDescriptionTattoUseCase(tattooRepository)

  return useCase
}
