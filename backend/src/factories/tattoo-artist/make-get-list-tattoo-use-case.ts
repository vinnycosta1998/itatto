import { PrismaTattooArtistRepository } from "../../repositories/prisma/prisma-tattoo-artist-repository";
import { GetListTattooArtistUseCase } from "../../use-cases/tattoo-artist/get-list-tattoo-artist";

export function makeGetListTattooArtist() {
  const tattooArtistRepository = new PrismaTattooArtistRepository();

  const useCase = new GetListTattooArtistUseCase(tattooArtistRepository);

  return useCase;
}
