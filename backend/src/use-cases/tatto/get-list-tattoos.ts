import { Prisma } from "@prisma/client"
import { TattoosRepository } from "../../repositories/tattoos-repository"
import { EmpytListTattoosError } from "../../errors/empyt-list-tattos-error"

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
           throw new EmpytListTattoosError()
        }

        return {
            tattoos
        }
    }
}