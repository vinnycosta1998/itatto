import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTattoosRepository } from "../../repositories/in-memory/in-memory-tattoos-repository";
import { GetListTattooUseCase } from "./get-list-tattoos";

let tattooRepository: InMemoryTattoosRepository
let sut: GetListTattooUseCase

describe('Get list tattoo test', () => {
    beforeEach(() => {
        tattooRepository = new InMemoryTattoosRepository()
        sut = new GetListTattooUseCase(tattooRepository)
    })

    it('should be able to get list the tattoos', async () => {
        await tattooRepository.create({
            id: randomUUID(),
            title: 'Lion hand tattoo',
            description: 'Tattoo in hand',
            genre: 'Abstract',
            image: 'lion-tattoo.png',
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: 'user_id'
        })

        const { tattoos } = await sut.execute({
            userId: 'user_id',
            page: 1
        })

        expect(tattoos).toHaveLength(1)
    })
})