import { User } from "@prisma/client"
import { UsersRepository } from "../../repositories/users-repository"
import { UserNotFoundError } from "../../errors/user-not-found-error"
import { PasswordLenghtError } from "../../errors/password-length-error"

interface UpdatePasswordRequest{
    email: string
    newPassword: string
}

interface UpdatePasswordResponse{
    updatePasswordUser: User[]
}

export class UpdatePasswordUseCase {
    constructor(private usersRepository: UsersRepository){}

    async execute({email, newPassword} : UpdatePasswordRequest):Promise<UpdatePasswordResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new UserNotFoundError()
        }

        if(newPassword.length < 8 || newPassword.length > 14){
            throw new PasswordLenghtError()
        }

        const updatePasswordUser = await this.usersRepository.updatePassword(email, newPassword)

        return {
            updatePasswordUser
        }
}}