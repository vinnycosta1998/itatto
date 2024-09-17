import { randomUUID } from 'node:crypto'
import type { UsersRepository, UsersRepositoryProps } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: UsersRepositoryProps[] = []

  async create(data: UsersRepositoryProps) {
    const user = {
      id: randomUUID(),
      name: data.name,
      gender: data.gender,
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      cep: data.cep
    }

    this.items.push(user)
    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find(item => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
