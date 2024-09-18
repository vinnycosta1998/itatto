import { PrismaTattoosRepository } from '../../repositories/prisma/prisma-tatto-rerpository'
import { SearchManyTattoosUseCase } from '../../use-cases/tatto/search-many-tattoo'

export function makeSearchManyTatto() {
  const tattooRepository = new PrismaTattoosRepository()

  const useCase = new SearchManyTattoosUseCase(tattooRepository)

  return useCase
}
