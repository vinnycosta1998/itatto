import type {
  TattoosRepository,
  TattoosRepositoryProps
} from '../../repositories/tattoos-repository'

interface DeleteTattooRequest {
  id: string
}

interface DeleteTattoResponse {
  tattoos: TattoosRepositoryProps[]
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
