import { Prisma } from '@prisma/client'
import type {
  TattoosRepository,
} from '../../repositories/tattoos-repository'

interface UpdateImageTattoRequest {
  id: string
  image: string
}

interface UpdateImageTattoResponse {
  tattoos: Prisma.TattoCreateInput[]
}

export class UpdateImageTattoUseCase {
  constructor(private tattooRepository: TattoosRepository) {}

  async execute({
    id,
    image
  }: UpdateImageTattoRequest): Promise<UpdateImageTattoResponse> {
    const tattoos = await this.tattooRepository.updateImageTattoById(id, image)

    return {
      tattoos
    }
  }
}
