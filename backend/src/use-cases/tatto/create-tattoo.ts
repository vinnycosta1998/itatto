import type { TattoosRepository } from '../../repositories/tattoos-repository'
import { DescriptionHasLongError } from '../../errors/description-has-long-error'
import type { Prisma } from '@prisma/client'

interface CreateTattooRequestProps {
  title: string
  description: string
  genre: string
  image: string
}

interface CreateTattooResponseProps {
  tattoo: Prisma.TattoCreateInput
}

export class CreateTattoUseCase {
  constructor(private tattoosRepository: TattoosRepository) {}

  async execute({
    title,
    description,
    genre,
    image
  }: CreateTattooRequestProps): Promise<CreateTattooResponseProps> {
    const descriptionLength = description.length

    if (descriptionLength > 60) {
      throw new DescriptionHasLongError()
    }

    const tattoo = await this.tattoosRepository.create({
      title,
      description,
      genre,
      image
    })

    return {
      tattoo
    }
  }
}
