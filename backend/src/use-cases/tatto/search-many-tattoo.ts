import { TattoosRepository, TattoosRepositoryProps } from "../../repositories/tattoos-repository"

interface SearchManyRequest{
    query: string
    page: number
}

interface SearchManyResponse{
    tattoos: TattoosRepositoryProps[]
}

export class SearchManyTattoosUseCase{
    constructor(private tattoosRepository: TattoosRepository){}

    async execute({ query, page } : SearchManyRequest ) : Promise<SearchManyResponse>{
        
        const tattoos = await this.tattoosRepository.searchMany(query, page)

        return {
            tattoos
        }

    }
}