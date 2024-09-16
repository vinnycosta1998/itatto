export interface TattoosRepositoryProps{
    id: string
    title: string
    description: string
    genre: string
    image: string
    created_at?: Date
    updated_at?: Date
}

export interface TattoosRepository{
    create(data: TattoosRepositoryProps) : Promise<TattoosRepositoryProps>
    findById(id: string): Promise<TattoosRepositoryProps | null>
}