interface UserRepositoryProps{
    id: string
    name: string
    gender: 'male' | 'female'
    email: string
    password: string
    cpf: string
    cep: string
    created_at: Date
    updated_at: Date
}

export interface UserRepository{
    create(data:UserRepositoryProps): Promise<UserRepositoryProps>
}