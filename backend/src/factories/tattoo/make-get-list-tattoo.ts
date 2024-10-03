import { PrismaTattoosRepository } from "../../repositories/prisma/prisma-tatto-repository";
import { GetListTattooUseCase } from "../../use-cases/tatto/get-list-tattoos";

export function makeGetListTattoo() {
  const tattooRepository = new PrismaTattoosRepository();

  const useCase = new GetListTattooUseCase(tattooRepository);

  return useCase;
}
