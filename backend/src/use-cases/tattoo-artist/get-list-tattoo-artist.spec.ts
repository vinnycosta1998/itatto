import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTattooArtistRepository } from "../../repositories/in-memory/in-memory-tattoo-artist-repository";
import { GetListTattooArtistUseCase } from "./get-list-tattoo-artist";

let tattooArtistRepository: InMemoryTattooArtistRepository;
let sut: GetListTattooArtistUseCase;

describe("Get list Tattoo Artist test", () => {
  beforeEach(() => {
    tattooArtistRepository = new InMemoryTattooArtistRepository();
    sut = new GetListTattooArtistUseCase(tattooArtistRepository);
  });

  it("should be able to get list tattoo", async () => {
    const artistCreated = await tattooArtistRepository.create({
      id: randomUUID(),
      name: "John doe",
      bio: "Tatto with 15 years experience",
      image: "profile.jpeg",
      phone: "4133333333",
      cep: "81380-130",
      street: "Avenue 480",
      neighborhood: "Manhattan",
      city: "New York",
      houseNumber: "300",
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id: "user-id",
    });

    const { artist } = await sut.execute({
      userId: artistCreated.id,
    });

    expect(artist).toEqual(
      expect.objectContaining({
        id: artistCreated.id,
        name: artistCreated.name,
        user_id: artistCreated.user_id,
      }),
    );
  });
});
