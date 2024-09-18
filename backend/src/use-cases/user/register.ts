import { hash } from 'bcryptjs'
import type { UsersRepository } from '../../repositories/users-repository'
import { UserAlreadyExistsError } from '../../errors/user-already-exists-error'
import { PasswordLenghtError } from '../../errors/password-length-error'
import type { Prisma, User } from '@prisma/client'

interface RegisterRequestProps extends Prisma.UserCreateInput {}

interface RegisterResponseProps {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    name,
    email,
    password
  }: RegisterRequestProps): Promise<RegisterResponseProps> {
    if (password.length < 8 || password.length > 14) {
      throw new PasswordLenghtError()
    }

    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return {
      user
    }
  }
}
