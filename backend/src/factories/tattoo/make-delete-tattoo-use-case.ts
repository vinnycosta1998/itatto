import { PrismaTattoosRepository } from "../../repositories/prisma/prisma-tatto-repository";
import { DeleteTattooUseCase } from "../../use-cases/tatto/delete-tattoo";

export function makeDeleteTattoo() {
  const tattooRepository = new PrismaTattoosRepository();

  const useCase = new DeleteTattooUseCase(tattooRepository);

  return useCase;
}
