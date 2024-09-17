import type {
  TattoosRepository,
  TattoosRepositoryProps
} from '../../repositories/tattoos-repository'

interface UpdateGenreTattoRequest {
  id: string
  genre: string
}

interface UpdateGenreTattoResponse {
  tattoos: TattoosRepositoryProps[]
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
