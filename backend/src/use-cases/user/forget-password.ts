import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/users-repository";
import { UserNotFoundError } from "../../errors/user-not-found-error";
import { PasswordLenghtError } from "../../errors/password-length-error";
import { hash } from "bcryptjs";

interface ForgetPasswordRequest {
  email: string;
  newPassword: string;
}

interface ForgetPasswordResponse {
  updatePasswordUser: User[];
}

export class ForgetPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    newPassword,
  }: ForgetPasswordRequest): Promise<ForgetPasswordResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (newPassword.length < 8 || newPassword.length > 14) {
      throw new PasswordLenghtError();
    }

    const password_hash = await hash(newPassword, 6);

    const updatePasswordUser = await this.usersRepository.updatePassword(
      email,
      password_hash,
    );

    return {
      updatePasswordUser,
    };
  }
}
