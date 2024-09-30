export interface TattooArtistProps{
  id: string
  name: string
  bio: string
  image: string
  phone: string
  cep: string
  street: string
  neighborhood: string
  city: string
  createdAt?: Date
  updatedAt?: Date
}

export interface TattoosArtistRepository {
  create(data: TattooArtistProps): Promise<TattooArtistProps>
  findByPhone(phone: string): Promise<TattooArtistProps | null>
}
