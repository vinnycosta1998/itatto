export class PasswordLenghtError extends Error {
  constructor() {
    super('Password has contain 8 and 14 carachtheres')
  }
}
