import { randomUUID } from "node:crypto";
import { TattoosRepository, TattoosRepositoryProps } from "../tattos-repository";

export class InMemoryTattoosRepository implements TattoosRepository{
    public items: TattoosRepositoryProps[] = []

    async create(data: TattoosRepositoryProps){
        const tattoo = {
            id: randomUUID(),
            title: data.title,
            description: data.description,
            genre: data.genre,
            image: data.image
        }

        this.items.push(tattoo)

        return tattoo
    }
}