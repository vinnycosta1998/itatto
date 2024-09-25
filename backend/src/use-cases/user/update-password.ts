import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";
import { UserNotFoundError } from "../../errors/user-not-found-error";
import { PasswordLenghtError } from "../../errors/password-length-error";
import { hash } from "bcryptjs";

interface UpdatePasswordRequest {
  email: string;
  newPassword: string;
}

interface UpdatePasswordResponse {
  updatedPasswordUser: User[];
}

export class UpdatePasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    newPassword,
  }: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (newPassword.length < 8 || newPassword.length > 14) {
      throw new PasswordLenghtError();
    }

    const password_hash = await hash(newPassword, 6);

    const updatedPasswordUser = await this.usersRepository.updatePassword(
      email,
      password_hash,
    );

    return {
      updatedPasswordUser,
    };
  }
}
