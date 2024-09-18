import type { TattoosRepository } from '../../repositories/tattoos-repository'
import type { Prisma } from '@prisma/client'

interface UpdateGenreTattoRequest {
  id: string
  genre: string
}

interface UpdateGenreTattoResponse {
  tattoos: Prisma.TattoCreateInput[]
}

export class UpdateGenreTattoUseCase {
  constructor(private tattooRepository: TattoosRepository) {}

  async execute({
    id,
    genre
  }: UpdateGenreTattoRequest): Promise<UpdateGenreTattoResponse> {
    const tattoos = await this.tattooRepository.updateGenreTattoById(id, genre)

    return {
      tattoos
    }
  }
}
