import { Prisma } from "@prisma/client"
import { TattoosRepository } from "../../repositories/tattoos-repository"

interface GetListTattooRequest{
    id: string
}

interface GetListTattooResponse{
    tattoos: Prisma.TattoCreateInput[]
}


export class GetListTattooUseCase{
    constructor(private tattooRepository: TattoosRepository){}

    async execute({id } : GetListTattooRequest): Promise<GetListTattooResponse>{
        const tattoos = await this.tattooRepository.findMany(id)

        if(!tattoos){
            throw new Error("Your list the tattos is empyt")
        }

        return {
            tattoos
        }
    }
}