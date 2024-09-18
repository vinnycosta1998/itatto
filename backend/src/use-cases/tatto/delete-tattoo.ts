import type { TattoosRepository } from '../../repositories/tattoos-repository'
import type { Prisma } from '@prisma/client'

interface DeleteTattooRequest {
  id: string
}

interface DeleteTattoResponse {
  tattoos: Prisma.TattoCreateInput[]
}

export class DeleteTattooUseCase {
  constructor(private tattooRepository: TattoosRepository) {}

  async execute({ id }: DeleteTattooRequest): Promise<DeleteTattoResponse> {
    const tattoos = await this.tattooRepository.deleteById(id)

    return {
      tattoos
    }
  }
}
