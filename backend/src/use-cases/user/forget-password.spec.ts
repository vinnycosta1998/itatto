import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { ForgetPasswordUseCase } from "./forget-password";
import { PasswordLenghtError } from "../../errors/password-length-error";

let usersRepository : InMemoryUsersRepository
let sut: ForgetPasswordUseCase

describe('Forget password test', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository(),
        sut = new ForgetPasswordUseCase(usersRepository)
    })

    it('should be able to update password', async () => {
        const createdUser = await usersRepository.create({
            id: randomUUID(),
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678'
        })

        const { updatePasswordUser } = await sut.execute({
            email: createdUser.email,
            newPassword: 'abcdefgh'
        })
q
        expect(updatePasswordUser).toEqual([
            expect.objectContaining({ password: 'abcdefgh' })
          ])
    })

    it('should not be able to update password with less 8 caractheres and 14 more carachteres', async () => {
        const createdUser = await usersRepository.create({
            id: randomUUID(),
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678'
        })

        await expect(() => 
            sut.execute({
                email: createdUser.email,
                newPassword: 'abcdef'
            })
        ).rejects.toBeInstanceOf(PasswordLenghtError)
    })
})