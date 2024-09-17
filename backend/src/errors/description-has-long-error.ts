export class DescriptionHasLongError extends Error {
  constructor() {
    super('Description has contain between 0 to 60 caractheres long')
  }
}
