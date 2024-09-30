import { prisma } from '../../lib/prisma'
import type { Prisma, Tatto } from '@prisma/client'
import type { TattoosRepository } from '../tattoos-repository'

export class PrismaTattoosRepository implements TattoosRepository {
  async create(data: Prisma.TattoCreateInput) {
    const tattoo = await prisma.tatto.create({
      data: {
        title: data.title,
        description: data.description,
        genre: data.genre,
        image: data.image,
      }
    })

    return tattoo
  }

  async findById(id: string) {
    const tattoo = await prisma.tatto.findFirst({
      where: {
        user_id: id
      }
    })

    return tattoo
  }

  async findManyByUserId(userId: string, page: number){
    const tattoos = await prisma.tatto.findMany({
      where:{
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return tattoos
  }

  async deleteById(id: string) {
    const deleteTatto = await prisma.tatto.delete({
      where: {
        id
      }
    })

    const tattoos = await prisma.tatto.findMany({})

    return tattoos
  }

  async searchMany(query: string, page: number): Promise<Tatto[]> {
    const tattoos = await prisma.tatto.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return tattoos
  }

  async updateDescriptionTattoById(id: string, description: string) {
    const updateTattoo = await prisma.tatto.update({
      where: {
        id
      },
      data: {
        description
      }
    })

    const tattoos = await prisma.tatto.findMany({})

    return tattoos
  }

  async updateGenreTattoById(id: string, genre: string) {
    const updateTattoo = await prisma.tatto.update({
      where: {
        id
      },
      data: {
        genre
      }
    })

    const tattoos = await prisma.tatto.findMany({})

    return tattoos
  }

  async updateImageTattoById(id: string, image: string) {
    const updateTattoo = await prisma.tatto.update({
      where: {
        id
      },
      data: {
        image
      }
    })

    const tattoos = await prisma.tatto.findMany({})

    return tattoos
  }

  async updateTitleTattoById(id: string, title: string) {
    const updateTatto = await prisma.tatto.update({
      where: {
        id
      },
      data: {
        title
      }
    })

    const tattoos = await prisma.tatto.findMany({})

    return tattoos
  }
}
