import { randomUUID } from 'node:crypto'
import { beforeEach, describe, it, expect } from 'vitest'
import { InMemoryTattoosRepository } from '../../repositories/in-memory/in-memory-tattoos-repository'
import { UpdateGenreTattoUseCase } from './update-genre-tatto'

let tattoRepository: InMemoryTattoosRepository
let sut: UpdateGenreTattoUseCase

describe('Update genre tatto test', () => {
  beforeEach(() => {
    tattoRepository = new InMemoryTattoosRepository()
    sut = new UpdateGenreTattoUseCase(tattoRepository)
  })

  it('should be able to update genre the tatto by id', async () => {
    const tattoo = await tattoRepository.create({
      id: randomUUID(),
      title: 'Lion hand tatto',
      description: 'Tattoo in hand',
      genre: 'Abstract',
      image: 'lion-tattoo.png'
    })

    const { tattoos } = await sut.execute({
      id: tattoo.id,
      genre: 'Realistic'
    })

    expect(tattoos).toEqual([expect.objectContaining({ genre: 'Realistic' })])
  })
})
