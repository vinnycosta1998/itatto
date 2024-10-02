import { randomUUID } from "node:crypto";
import { TattoosArtistRepository } from "../tattoo-artist-repository";
import { TattooArtist } from "@prisma/client";

export class InMemoryTattooArtistRepository implements TattoosArtistRepository {
  public items: TattooArtist[] = [];

  async create(data: TattooArtist) {
    const artist = {
      id: randomUUID(),
      name: data.name,
      bio: data.bio,
      image: data.image,
      phone: data.phone,
      cep: data.cep,
      street: data.street,
      neighborhood: data.neighborhood,
      city: data.city,
      houseNumber: data.houseNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id: "user-id",
    };

    this.items.push(artist);

    return artist;
  }

  async findById(id: string) {
    const artist = this.items.find((item) => item.id === id);

    if (!artist) {
      return null;
    }

    return artist;
  }

  async findByPhone(phone: string) {
    const phoneArtist = this.items.find((item) => item.phone === phone);

    if (!phoneArtist) {
      return null;
    }

    return phoneArtist;
  }
}
