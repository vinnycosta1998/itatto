import { UserNotFoundError } from '../../errors/user-not-found-error'
import type {
  UsersRepository,
  UsersRepositoryProps
} from '../../repositories/users-repository'

interface GetUserProfileRequest {
  id: string
}

interface GetUserProfileResponse {
  user: UsersRepositoryProps
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return {
      user
    }
  }
}
