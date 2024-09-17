export interface UsersRepositoryProps {
  id: string
  name: string
  gender: string
  email: string
  password: string
  cpf: string
  cep: string
  created_at?: Date
  updated_at?: Date
}

export interface UsersRepository {
  create(data: UsersRepositoryProps): Promise<UsersRepositoryProps>
  findById(id: string): Promise<UsersRepositoryProps | null>
  findByEmail(email: string): Promise<UsersRepositoryProps | null>
}
