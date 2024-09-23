import { Tatto } from "@prisma/client"
import { TattoosRepository } from "../../repositories/tattoos-repository"
import { EmpytListTattoosError } from "../../errors/empyt-list-tattos-error"

interface GetListTattooRequest{
    userId: string
    page: number
}

interface GetListTattooResponse{
    tattoos: Tatto[]
}


export class GetListTattooUseCase{
    constructor(private tattooRepository: TattoosRepository){}

    async execute({ userId, page } : GetListTattooRequest): Promise<GetListTattooResponse>{
        const tattoos = await this.tattooRepository.findManyByUserId(userId, page)

        if(!tattoos){
           throw new EmpytListTattoosError()
        }

        return {
            tattoos
        }
    }
}