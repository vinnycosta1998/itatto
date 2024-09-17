export interface TattoosRepositoryProps {
  id: string
  title: string
  description: string
  genre: string
  image: string
  created_at?: Date
  updated_at?: Date
}

export interface TattoosRepository {
  create(data: TattoosRepositoryProps): Promise<TattoosRepositoryProps>
  findById(id: string): Promise<TattoosRepositoryProps | null>
  deleteById(id: string): Promise<TattoosRepositoryProps[]>
  searchMany(query: string, page: number): Promise<TattoosRepositoryProps[]>
  updateDescriptionTattoById(
    id: string,
    description: string
  ): Promise<TattoosRepositoryProps[]>
  updateGenreTattoById(
    id: string,
    genre: string
  ): Promise<TattoosRepositoryProps[]>
  updateImageTattoById(
    id: string,
    image: string
  ): Promise<TattoosRepositoryProps[]>
  updateTitleTattoById(
    id: string,
    title: string
  ): Promise<TattoosRepositoryProps[]>
}
