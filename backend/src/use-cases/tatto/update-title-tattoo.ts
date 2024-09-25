import { Prisma } from '@prisma/client'
import type {
  TattoosRepository,
} from '../../repositories/tattoos-repository'

interface UpdateTitleTattoRequest {
  id: string
  title: string
}

interface UpdateTitleTattoResponse {
  tattoos: Prisma.TattoCreateInput[]
}

export class UpdateTitleTattoUseCase {
  constructor(private tattooRepository: TattoosRepository) {}

  async execute({
    id,
    title
  }: UpdateTitleTattoRequest): Promise<UpdateTitleTattoResponse> {
    const tattoos = await this.tattooRepository.updateTitleTattoById(id, title)

    return {
      tattoos
    }
  }
}
