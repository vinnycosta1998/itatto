import type { Tatto } from '@prisma/client'

export interface TattoosRepository {
  create(data: Tatto): Promise<Tatto>
  findById(id: string): Promise<Tatto | null>
  deleteById(id: string): Promise<Tatto[]>
  searchMany(query: string, page: number): Promise<Tatto[]>
  updateDescriptionTattoById(id: string, description: string): Promise<Tatto[]>
  updateGenreTattoById(id: string, genre: string): Promise<Tatto[]>
  updateImageTattoById(id: string, image: string): Promise<Tatto[]>
  updateTitleTattoById(id: string, title: string): Promise<Tatto[]>
}
