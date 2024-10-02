import { Prisma, TattooArtist } from "@prisma/client";

export interface TattoosArtistRepository {
  create(data: Prisma.TattooArtistCreateInput): Promise<TattooArtist>;
  findById(id: string): Promise<TattooArtist | null>;
  findByPhone(phone: string): Promise<TattooArtist | null>;
}
