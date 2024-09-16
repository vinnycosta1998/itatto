import { hash } from "bcryptjs";
import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryUsersRepository } from "../../repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./auhenticate";
import { UserNotFoundError } from "../../errors/user-not-found-error";
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('should be able to authenticate', async () => {
        await usersRepository.create({
            id: "1",
            name: 'John Doe',
            gender: 'male',
            email: 'johndoe@example.com',
            password: await hash("12345678", 6),
            cpf: '11255549980',
            cep: '81130590',
        })

        const { user } = await sut.execute({
            email: 'johndoe@example.com',
            password: '12345678'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(() => 
            sut.execute({
                email: 'john@example.com',
                password: '12345678'
            })
        ).rejects.toBeInstanceOf(UserNotFoundError)
    })

    // it('should not be able to authenticate with password wrong', async () => {
    //     await expect(() => 
    //         sut.execute({
    //             email: 'johndoe@example.com',
    //             password: '123456'
    //         })
    //     ).rejects.toBeInstanceOf(InvalidCredentialsError)
    // })
})