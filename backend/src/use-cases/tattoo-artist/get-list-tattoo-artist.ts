import { TattooArtist } from "@prisma/client";
import { TattoosArtistRepository } from "../../repositories/tattoo-artist-repository";
import { TattooArtistNotFoundError } from "../../errors/tattoo-artist-not-found-error";

interface GetListTattooArtistRequest {
  userId: string;
}

interface GetListTattooArtistResponse {
  artist: TattooArtist;
}

export class GetListTattooArtistUseCase {
  constructor(private tattooArtistRepository: TattoosArtistRepository) {}

  async execute({
    userId,
  }: GetListTattooArtistRequest): Promise<GetListTattooArtistResponse> {
    const artist = await this.tattooArtistRepository.findById(userId);

    if (!artist) {
      throw new TattooArtistNotFoundError();
    }

    return {
      artist,
    };
  }
}
