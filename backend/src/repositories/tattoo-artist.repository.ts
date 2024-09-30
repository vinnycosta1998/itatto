import type { Prisma, Tatto } from '@prisma/client'

export interface TattoosRepository {
  create(data: Prisma.TattoCreateInput): Promise<Tatto>
  
}
