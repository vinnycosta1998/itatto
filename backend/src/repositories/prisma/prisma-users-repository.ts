import { prisma } from '../../lib/prisma'
import type { Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id
      }
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async updatePassword(email: string, newPassword: string) {
    const user = await prisma.user.update({
      where:{
        email
      },
      data:{
        password: newPassword
      }
    })

    return [user]
  }
}
