import { randomUUID } from "node:crypto";
import { TattoosRepository, TattoosRepositoryProps } from "../tattoos-repository";

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

    async findById(id: string){
        const tattoo = this.items.find((item) => item.id === id)

        if(!tattoo){
            return null
        }

        return tattoo
    }

    async deleteById(id: string){
        const tattoos = this.items.filter((item) => item.id !== id)

        return this.items = tattoos
    }

    async searchMany(query: string, page:number){
        return this.items.filter((item) => item.title.includes(query)).slice((page -1) * 20, page * 20)
    }
}