import { compare } from "bcryptjs"
import { UsersRepository, UsersRepositoryProps } from "../../repositories/users-repository"
import { InvalidCredentialsError } from "../../errors/invalid-credentials-error"
import { UserNotFoundError } from "../../errors/user-not-found-error"

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
            throw new UserNotFoundError()
        }

        const doesPasswordMatch = await compare(password, user.password)

        console.log(doesPasswordMatch)

        if(!doesPasswordMatch){
            throw new InvalidCredentialsError()
        }

        return {
            user
        }
    }
}