import { randomUUID } from 'node:crypto'
import { beforeEach, describe, it, expect } from 'vitest'
import { InMemoryTattoosRepository } from '../../repositories/in-memory/in-memory-tattoos-repository'
import { UpdateImageTattoUseCase } from './update-image-tatto'

let tattoRepository: InMemoryTattoosRepository
let sut: UpdateImageTattoUseCase

describe('Update title tatto test', () => {
  beforeEach(() => {
    tattoRepository = new InMemoryTattoosRepository()
    sut = new UpdateImageTattoUseCase(tattoRepository)
  })

  it('should be able to update title the tatto by id', async () => {
    const tattoo = await tattoRepository.create({
      id: randomUUID(),
      title: 'Lion hand tatto',
      description: 'Tattoo in hand',
      genre: 'Abstract',
      image: 'lion-tattoo.png',
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id: 'user_id'
    })

    const { tattoos } = await sut.execute({
      id: tattoo.id,
      image: 'bear-chest-tatto.jpeg'
    })

    expect(tattoos).toEqual([
      expect.objectContaining({ image: 'bear-chest-tatto.jpeg' })
    ])
  })
})
