import { Prisma, TattooArtist } from "@prisma/client";
import { BioHasLengthError } from "../../errors/bio-has-length-error";
import { TattooArtistWithSamePhoneNumber } from "../../errors/tattoo-artist-with-same-phone-number-error";
import { TattoosArtistRepository } from "../../repositories/tattoo-artist-repository";

interface CreateTattooArtistRequest extends Prisma.TattooArtistCreateInput {}

interface CreateTattooArtistResponse {
  artist: TattooArtist;
}

export class CreateTattooArtistUseCase {
  constructor(private tattoArtist: TattoosArtistRepository) {}

  async execute({
    ...props
  }: CreateTattooArtistRequest): Promise<CreateTattooArtistResponse> {
    if (props.bio.length < 8 || props.bio.length > 240) {
      throw new BioHasLengthError();
    }

    const phone = await this.tattoArtist.findByPhone(props.phone);

    if (phone) {
      throw new TattooArtistWithSamePhoneNumber();
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
      city: props.city,
      houseNumber: props.houseNumber,
    });

    return {
      artist,
    };
  }
}
