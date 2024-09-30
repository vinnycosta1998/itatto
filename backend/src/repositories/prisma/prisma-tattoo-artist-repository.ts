import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import {  TattoosArtistRepository } from '../tattoo-artist-repository'

export class PrismaTattooArtistRepository implements TattoosArtistRepository{
  async create(data: Prisma.TattooArtistCreateInput, userId:string) {
    const artist = await prisma.tattooArtist.create({
      data: {
        name: data.name,
        bio: data.bio,
        image: data.image,
        phone: data.phone,
        cep: data.cep,
        street: data.street,
        neighborhood: data.neighborhood,
        city: data.city,
        userId
      }
    })

    return artist
  }

  async findByPhone(phone: string) {
    const phoneArtist = await prisma.tattooArtist.findFirst({
      where: {
        phone
      }
    })

    if(phoneArtist){
      return null
    }

    return phoneArtist
  }
}
