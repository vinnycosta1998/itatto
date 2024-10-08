import { PrismaTattoosRepository } from "../../repositories/prisma/prisma-tatto-repository";
import { UpdateGenreTattoUseCase } from "../../use-cases/tatto/update-genre-tatto";

export function makeUpdateGenreTattoo() {
  const tattooRepository = new PrismaTattoosRepository();

  const useCase = new UpdateGenreTattoUseCase(tattooRepository);

  return useCase;
}
