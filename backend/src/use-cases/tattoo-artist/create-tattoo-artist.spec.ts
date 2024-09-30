import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryTattooArtistRepository } from "../../repositories/in-memory/in-memory-tattoo-artist-repository";
import { CreateTattooArtistUseCase } from "./create-tattoo-artist";
import { TattooArtistWithSamePhoneNumber } from "../../errors/tattoo-artist-with-same-phone-number-error";

let createTattooArtist : InMemoryTattooArtistRepository
let sut: CreateTattooArtistUseCase

describe('Create Tattoo Artist', () => {
    beforeEach(() => {
        createTattooArtist = new InMemoryTattooArtistRepository()
        sut = new CreateTattooArtistUseCase(createTattooArtist)
    })

    it('should be able to create a tattoo artist', async () => {
        const { artist } = await sut.execute({
            id: randomUUID(),
            name: 'John Doe',
            bio: 'Tattoo artist with 10 years experience',
            image: 'profile.jpeg',
            phone: '41222222222',
            cep: '81123456',
            street: 'Avenida Atlantica',
            neighborhood: 'Barra Sul',
            city: 'balneario Camboriu'
        })

        expect(artist.id).toEqual(expect.any(String))
    })

    it('should not be able to create a tattoo artist with same phone number', async() => {
        await sut.execute({
            id: randomUUID(),
            name: 'John Doe',
            bio: 'Tattoo artist with 10 years experience',
            image: 'profile.jpeg',
            phone: '41222222222',
            cep: '81123456',
            street: 'Avenida Atlantica',
            neighborhood: 'Barra Sul',
            city: 'balneario Camboriu'
        })

        await expect(() => 
            sut.execute({
                id: randomUUID(),
                name: 'John Doe',
                bio: 'Tattoo artist with 10 years experience',
                image: 'profile.jpeg',
                phone: '41222222222',
                cep: '81123456',
                street: 'Avenida Atlantica',
                neighborhood: 'Barra Sul',
                city: 'balneario Camboriu'
        })
    )
    })
})