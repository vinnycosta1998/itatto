import { compare } from "bcryptjs"
import { UsersRepository, UsersRepositoryProps } from "../../repositories/users-repository"

interface AuthenticateRequestProps{
    email: string
    password: string
}

interface AuthenticateResponseProps{
    user: UsersRepositoryProps
}

export class AuthenticateUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({ email, password } : AuthenticateRequestProps) : Promise<AuthenticateResponseProps>{
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new Error("User not found")
        }

        const doesPasswordMatch = await compare(password, user.password)

        if(!doesPasswordMatch){
            throw new Error("credentials invalid")
        }

        return {
            user
        }
        
    }
}