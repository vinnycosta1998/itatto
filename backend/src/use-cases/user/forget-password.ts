import { User } from "@prisma/client"
import { UsersRepository } from "../../repositories/users-repository"
import { UserNotFoundError } from "../../errors/user-not-found-error"

interface ForgetPasswordRequest{
    email: string
}

interface ForgetPasswordResponse{
    user: User
}

export class ForgetPasswordUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({email} : ForgetPasswordRequest): Promise<ForgetPasswordResponse>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new UserNotFoundError()
        }

        return{
            user
        }
    }
}