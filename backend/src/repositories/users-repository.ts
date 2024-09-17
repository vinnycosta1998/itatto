export interface UsersRepositoryProps {
  id: string
  name: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
}

export interface UsersRepository {
  create(data: UsersRepositoryProps): Promise<UsersRepositoryProps>
  findById(id: string): Promise<UsersRepositoryProps | null>
  findByEmail(email: string): Promise<UsersRepositoryProps | null>
}
