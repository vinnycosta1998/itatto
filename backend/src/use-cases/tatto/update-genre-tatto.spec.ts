import { randomUUID } from 'node:crypto'
import { beforeEach, describe, it, expect } from 'vitest'
import { InMemoryTattoosRepository } from '../../repositories/in-memory/in-memory-tattoos-repository'
import { UpdateGenreTattoUseCase } from './update-genre-tatto'

let tattoosRepository: InMemoryTattoosRepository
let sut: UpdateGenreTattoUseCase

describe('Update genre tatto test', () => {
  beforeEach(() => {
    tattoosRepository = new InMemoryTattoosRepository()
    sut = new UpdateGenreTattoUseCase(tattoosRepository)
  })

  it('should be able to update genre the tatto by id', async () => {
    const tattoo = await tattoosRepository.create({
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
      genre: 'Realistic'
    })

    expect(tattoos).toEqual([expect.objectContaining({ genre: 'Realistic' })])
  })
})
