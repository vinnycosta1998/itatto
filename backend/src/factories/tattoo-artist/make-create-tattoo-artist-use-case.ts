import { PrismaTattooArtistRepository } from "../../repositories/prisma/prisma-tattoo-artist-repository";
import { CreateTattooArtistUseCase } from "../../use-cases/tattoo-artist/create-tattoo-artist";

export function makeCreateTattooArtist() {
  const tattooArtistRepository = new PrismaTattooArtistRepository();

  const useCase = new CreateTattooArtistUseCase(tattooArtistRepository);

  return useCase;
}
