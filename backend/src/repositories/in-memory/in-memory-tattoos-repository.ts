import { randomUUID } from 'node:crypto'
import type { TattoosRepository } from '../tattoos-repository'
import type { Prisma } from '@prisma/client'

export class InMemoryTattoosRepository implements TattoosRepository {
  public items: Prisma.TattoCreateInput[] = []

  async create(data: Prisma.TattoCreateInput) {
    const tattoo = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      genre: data.genre,
      image: data.image
    }

    this.items.push(tattoo)

    return tattoo
  }

  async findById(id: string) {
    const tattoo = this.items.find(item => item.id === id)

    if (!tattoo) {
      return null
    }

    return tattoo
  }

  async findMany(id: string){
    const tattoos = this.items.find(item => item)

    if(!tattoos){
      return null
    }

    return tattoos
  }

  async deleteById(id: string) {
    const tattoos = this.items.filter(item => item.id !== id)

    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    return (this.items = tattoos)
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter(item => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async updateDescriptionTattoById(id: string, description: string) {
    const tattoo = this.items.map(item =>
      item.id === id ? { ...item, description } : item
    )

    return tattoo
  }

  async updateGenreTattoById(id: string, genre: string) {
    const tattoo = this.items.map(item =>
      item.id === id ? { ...item, genre } : item
    )

    return tattoo
  }

  async updateImageTattoById(id: string, image: string) {
    const tattoo = this.items.map(item =>
      item.id === id ? { ...item, image } : item
    )

    return tattoo
  }

  async updateTitleTattoById(id: string, title: string) {
    const tattoo = this.items.map(item =>
      item.id === id ? { ...item, title } : item
    )

    return tattoo
  }
}
