import { randomUUID } from 'node:crypto'
import type { UsersRepository  } from '../users-repository'
import type { Prisma, User } from '@prisma/client'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
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

  async updatePassword(email:string, newPassword: string){
    const user = this.items.map(item => item.email === email ? {...item, password:newPassword} : item)

    return user
  }
}
