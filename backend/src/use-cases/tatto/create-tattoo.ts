import { randomUUID } from "node:crypto"
import { TattoosRepository, TattoosRepositoryProps } from "../../repositories/tattos-repository"
import { DescriptionHasLongError } from "../../errors/description-has-long-error"

interface CreateTattooRequestProps{
    id: string
    title: string
    description: string
    genre: string
    image: string
}

interface CreateTattooResponseProps{
    tattoo: TattoosRepositoryProps
}

export class CreateTattoUseCase{
    constructor(private tattoosRepository: TattoosRepository){}

    async execute({ title, description, genre, image } : CreateTattooRequestProps) : Promise<CreateTattooResponseProps>{
        const descriptionLength = description.length

        if(descriptionLength > 60){
            throw new DescriptionHasLongError()
        }

        const tattoo = await this.tattoosRepository.create({
            id: randomUUID(),
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