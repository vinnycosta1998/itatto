import type { Prisma, Tatto } from '@prisma/client'

export interface TattoosRepository {
  create(data: Prisma.TattoCreateInput): Promise<Tatto>
  findById(id: string): Promise<Tatto | null>
  findManyByUserId(userId: string, page:number): Promise<Tatto[] | null>
  deleteById(id: string): Promise<Tatto[]>
  searchMany(query: string, page: number): Promise<Tatto[]>
  updateDescriptionTattoById(
    id: string,
    description: string
  ): Promise<Prisma.TattoCreateInput[]>
  updateGenreTattoById(
    id: string,
    genre: string
  ): Promise<Prisma.TattoCreateInput[]>
  updateImageTattoById(
    id: string,
    image: string
  ): Promise<Prisma.TattoCreateInput[]>
  updateTitleTattoById(
    id: string,
    title: string
  ): Promise<Prisma.TattoCreateInput[]>
}
