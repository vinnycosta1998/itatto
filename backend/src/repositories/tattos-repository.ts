export interface TattoosRepositoryProps{
    id: string
    title: string
    description: string
    genre: string
    image: string
}

export interface TattoosRepository{
    create(data: TattoosRepositoryProps) : Promise<TattoosRepositoryProps>
}