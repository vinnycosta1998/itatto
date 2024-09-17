import { randomUUID } from 'node:crypto'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user pasword upon registration', async () => {
    const { user } = await sut.execute({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678'
    })

    const isPasswordCorrectHashed = await compare('12345678', user.password)

    expect(isPasswordCorrectHashed).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      id: randomUUID(),
      name: 'John Doe',
      email,
      password: '12345678'
    })

    await expect(() =>
      sut.execute({
        id: randomUUID(),
        name: 'John Doe',
        email,
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
