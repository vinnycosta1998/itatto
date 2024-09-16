import { randomUUID } from "node:crypto";
import { beforeAll, describe, it, expect } from "vitest";
import { TattoosRepository } from "../../repositories/tattos-repository";
import { CreateTattoUseCase } from "./create-tattoo";
import { InMemoryTattoosRepository } from "../../repositories/in-memory/in-memory-tattoos-repository";

let tattooRepository: TattoosRepository
let sut: CreateTattoUseCase

describe('Create tattoo test', () => {
    beforeAll(() => {
        tattooRepository = new InMemoryTattoosRepository()
        sut = new CreateTattoUseCase(tattooRepository)
    })

    it('should be able to create tatto', async () => {
        const { tattoo } = await sut.execute({
            id: randomUUID(),
            title: 'Lion hand tatto',
            description: 'Tattoo in hand',
            genre: 'Abstract',
            image: 'lion-tattoo.png',
        })

        expect(tattoo.id).toEqual(expect.any(String))
    })
})