import { describe, it, expect, beforeEach } from 'vitest'
import { CreateTattoUseCase } from './create-tattoo'
import { InMemoryTattoosRepository } from '../../repositories/in-memory/in-memory-tattoos-repository'
import { DescriptionHasLongError } from '../../errors/description-has-long-error'

let tattoosRepository: InMemoryTattoosRepository
let sut: CreateTattoUseCase

describe('Create tattoo test', () => {
  beforeEach(() => {
    tattoosRepository = new InMemoryTattoosRepository()
    sut = new CreateTattoUseCase(tattoosRepository)
  })

  it('should be able to create tatto', async () => {
    const { tattoo } = await sut.execute({
      title: 'Lion hand tatto',
      description: 'Tattoo in hand',
      genre: 'Abstract',
      image: 'lion-tattoo.png'
    })

    expect(tattoo.id).toEqual(expect.any(String))
  })

  it('should not be able to create a description with more 60 caractheres', async () => {
    await expect(() =>
      sut.execute({
        title: 'Lion hand tatto',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        genre: 'Abstract',
        image: 'lion-tattoo.png'
      })
    ).rejects.toBeInstanceOf(DescriptionHasLongError)
  })
})
