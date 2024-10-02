export class TattooArtistNotFoundError extends Error {
  constructor() {
    super("Tattoo artist not found");
  }
}
