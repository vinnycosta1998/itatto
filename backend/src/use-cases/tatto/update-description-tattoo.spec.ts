import { randomUUID } from 'node:crypto'
import { beforeEach, describe, it, expect } from 'vitest'
import { InMemoryTattoosRepository } from '../../repositories/in-memory/in-memory-tattoos-repository'
import { UpdateDescriptionTattoUseCase } from './update-description-tattoo'

let tattoRepository: InMemoryTattoosRepository
let sut: UpdateDescriptionTattoUseCase

describe('Update description tatto test', () => {
  beforeEach(() => {
    tattoRepository = new InMemoryTattoosRepository()
    sut = new UpdateDescriptionTattoUseCase(tattoRepository)
  })

  it('should be able to update title the tatto by id', async () => {
    const tattoo = await tattoRepository.create({
      id: randomUUID(),
      title: 'Lion hand tatto',
      description: 'Tattoo in hand',
      genre: 'Abstract',
      image: 'lion-tattoo.png'
    })

    const { tattoos } = await sut.execute({
      id: tattoo.id,
      description: 'Bear in chest'
    })

    expect(tattoos).toEqual([
      expect.objectContaining({ description: 'Bear in chest' })
    ])
  })
})
