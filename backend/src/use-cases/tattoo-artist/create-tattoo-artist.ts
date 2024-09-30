import { TattooArtistWithSamePhoneNumber } from "../../errors/tattoo-artist-with-same-phone-number-error";
import { TattooArtistProps, TattoosArtistRepository } from "../../repositories/tattoo-artist-repository";

type CreateTattooArtistRequest = TattooArtistProps

type CreateTattooArtistResponse = {
    artist: TattooArtistProps
}

export class CreateTattooArtistUseCase{
    constructor(private tattoArtist: TattoosArtistRepository ){}

    async execute({...props } : CreateTattooArtistRequest) : Promise<CreateTattooArtistResponse>{
        const phone = await this.tattoArtist.findByPhone(props.phone)

        if(phone){
            throw new TattooArtistWithSamePhoneNumber()
        }

        const artist = await this.tattoArtist.create({
            id: props.id,
            name: props.name,
            bio: props.bio,
            image: props.image,
            phone: props.phone,
            cep: props.cep,
            street: props.street,
            neighborhood: props.neighborhood,
            city: props.city
        })

        return {
            artist
        }
    }
}