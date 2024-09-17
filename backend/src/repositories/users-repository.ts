import type { User } from '@prisma/client'

export interface UsersRepository {
  create(data: User): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
}
