import { randomUUID } from "node:crypto";
import { describe, it, beforeEach, expect } from "vitest";
import { InMemoryTattoosRepository } from "../../repositories/in-memory/in-memory-tattoos-repository";
import { SearchManyTattoosUseCase } from "./search-many-tattoo";

let tattoosRepository: InMemoryTattoosRepository
let sut: SearchManyTattoosUseCase

describe('Search many tattoos use case', () => {
    beforeEach(async () => {
        tattoosRepository = new InMemoryTattoosRepository()
        sut = new SearchManyTattoosUseCase(tattoosRepository)
    })

    it('should be able to search tatto by title', async () => {
        await tattoosRepository.create({
            id: randomUUID(),
            title: 'Lion hand tatto',
            description: 'Tattoo in hand',
            genre: 'Abstract',
            image: 'lion-tattoo.png',
        })

        await tattoosRepository.create({
            id: randomUUID(),
            title: 'Bear hand tatto',
            description: 'Tattoo in hand',
            genre: 'Abstract',
            image: 'bear-tattoo.png',
        })

        const { tattoos } = await sut.execute({
            query: 'Lion',
            page: 1
        })

        expect(tattoos).toHaveLength(1)
        expect(tattoos).toEqual([expect.objectContaining({ title: 'Lion hand tatto' })])
    })
})