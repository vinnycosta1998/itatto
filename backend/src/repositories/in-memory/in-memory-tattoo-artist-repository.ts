import { randomUUID } from 'node:crypto'
import { TattooArtistProps, TattoosArtistRepository } from '../tattoo-artist-repository'

export class InMemoryTattooArtistRepository implements TattoosArtistRepository {
  public items: TattooArtistProps[] = []

  async create(data: TattooArtistProps) {
    const tattoo = {
      id: randomUUID(),
      name: data.name,
      bio: data.bio,
      image: data.image,
      phone: data.phone,
      cep: data.cep,
      street: data.street,
      neighborhood: data.neighborhood,
      city: data.city,
    }

    this.items.push(tattoo)

    return tattoo
  }

  async findByPhone(phone: string){
    const phoneArtist = this.items.find(item => item.id === phone)

    if (!phoneArtist) {
      return null
    }

    return phoneArtist
  }
}
