import { Prisma, TattooArtist } from "@prisma/client";

export interface TattoosArtistRepository {
  create(data: Prisma.TattooArtistCreateInput): Promise<TattooArtist>;
  findByPhone(phone: string): Promise<TattooArtist | null>;
}
