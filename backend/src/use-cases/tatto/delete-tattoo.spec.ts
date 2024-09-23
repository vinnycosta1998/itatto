import { randomUUID } from 'node:crypto'
import { beforeEach, describe, it, expect } from 'vitest'
import { DeleteTattooUseCase } from './delete-tattoo'
import { InMemoryTattoosRepository } from '../../repositories/in-memory/in-memory-tattoos-repository'

let tattooRepository: InMemoryTattoosRepository
let sut: DeleteTattooUseCase

describe('Delete tatto use case', () => {
  beforeEach(() => {
    tattooRepository = new InMemoryTattoosRepository()
    sut = new DeleteTattooUseCase(tattooRepository)
  })

  it('should be able to delete a tatton by id', async () => {
    const tatto = await tattooRepository.create({
      id: randomUUID(),
      title: 'Lion hand tatto',
      description: 'Tattoo in hand',
      genre: 'Abstract',
      image: 'lion-tattoo.png',
      createdAt: new Date(),
      updatedAt: new Date(),
      user_id: 'user_id'
    })

    await expect(() => sut.execute({ id: tatto.id })).toHaveLength(0)
  })
})
