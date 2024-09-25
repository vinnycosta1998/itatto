import { randomUUID } from "node:crypto";
import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { PasswordLenghtError } from "../../errors/password-length-error";
import { UpdatePasswordUseCase } from "./update-password";

let usersRepository: InMemoryUsersRepository;
let sut: UpdatePasswordUseCase;

describe("Update password test", () => {
  beforeEach(() => {
    (usersRepository = new InMemoryUsersRepository()),
      (sut = new UpdatePasswordUseCase(usersRepository));
  });

  it("should be able to update password", async () => {
    const createdUser = await usersRepository.create({
      id: randomUUID(),
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });

    const { updatedPasswordUser } = await sut.execute({
      email: createdUser.email,
      newPassword: "abcdefgh",
    });

    const user = updatedPasswordUser.find(
      (item) => item.email === createdUser.email,
    );

    const isPasswordCorrectHashed = await compare("abcdefgh", user!.password);

    expect(isPasswordCorrectHashed).toBe(true);
  });

  it("should not be able to update password with less 8 caractheres and 14 more carachteres", async () => {
    const createdUser = await usersRepository.create({
      id: randomUUID(),
      name: "John Doe",
      email: "johndoe@example.com",
      password: "12345678",
    });

    await expect(() =>
      sut.execute({
        email: createdUser.email,
        newPassword: "abcdef",
      }),
    ).rejects.toBeInstanceOf(PasswordLenghtError);
  });
});
