import type { Prisma } from '@prisma/client'

export interface TattoosRepository {
  create(data: Prisma.TattoCreateInput): Promise<Prisma.TattoCreateInput>
  findById(id: string): Promise<Prisma.TattoCreateInput | null>
  findMany(id: string): Promise<Prisma.TattoCreateInput[] | null>
  deleteById(id: string): Promise<Prisma.TattoCreateInput[]>
  searchMany(query: string, page: number): Promise<Prisma.TattoCreateInput[]>
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
