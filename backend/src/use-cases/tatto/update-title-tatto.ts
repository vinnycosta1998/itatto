import { TattoosRepository, TattoosRepositoryProps } from "../../repositories/tattoos-repository"

interface UpdateTitleTattoRequest{
    id: string
    title: string
}

interface UpdateTitleTattoResponse{
    tattoos: TattoosRepositoryProps[]
}

export class UpdateTitleTattoUseCase{
    constructor(private tattooRepository: TattoosRepository ){}
    
    async execute({ id, title } : UpdateTitleTattoRequest): Promise<UpdateTitleTattoResponse>{
        
        const tattoos = await this.tattooRepository.updateTitleTattoById(id, title)

        return {
            tattoos
        }
    }
}