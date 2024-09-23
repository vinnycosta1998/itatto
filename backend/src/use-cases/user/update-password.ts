import { User } from "@prisma/client"
import { UsersRepository } from "../../repositories/users-repository"
import { UserNotFoundError } from "../../errors/user-not-found-error"

interface UpdatePasswordRequest{
    email: string
    newPassword: string
}

interface UpdatePasswordResponse{
    updatePasswordUser: User[]
}

export class UpdatePassword {
    constructor(private usersRepository: UsersRepository){}

    async execute({email, newPassword} : UpdatePasswordRequest):Promise<UpdatePasswordResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new UserNotFoundError()
        }

        const updatePasswordUser = await this.usersRepository.updatePassword(email, newPassword)

        return {
            updatePasswordUser
        }
}}