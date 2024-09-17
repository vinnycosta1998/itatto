import type {
  TattoosRepository,
  TattoosRepositoryProps
} from '../../repositories/tattoos-repository'

interface UpdateDescriptionTattoRequest {
  id: string
  description: string
}

interface UpdateDescriptionTattoResponse {
  tattoos: TattoosRepositoryProps[]
}

export class UpdateDescriptionTattoUseCase {
  constructor(private tattooRepository: TattoosRepository) {}

  async execute({
    id,
    description
  }: UpdateDescriptionTattoRequest): Promise<UpdateDescriptionTattoResponse> {
    const tattoos = await this.tattooRepository.updateDescriptionTattoById(
      id,
      description
    )

    return {
      tattoos
    }
  }
}
