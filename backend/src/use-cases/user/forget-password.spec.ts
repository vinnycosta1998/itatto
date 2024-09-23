import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { ForgetPasswordUseCase } from "./forget-password";

let usersRepository : InMemoryUsersRepository
let sut: ForgetPasswordUseCase

describe('Forget password test', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository(),
        sut = new ForgetPasswordUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            id: randomUUID(),
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678'
        })

        const { user } = await sut.execute({email: createdUser.email })

        expect(user.id).toEqual(expect.any(String))
    })
})