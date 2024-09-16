import { hash } from "bcryptjs";
import { UsersRepository, UsersRepositoryProps } from "../../repositories/users-repository";
import { UserAlreadyExistsError } from "../../errors/user-already-exists-error";
import { PasswordLenghtError } from "../../errors/password-length-error";

interface RegisterRequestProps{
    id: string
    name: string
    gender: 'male' | 'female'
    email: string
    password: string
    cpf: string
    cep: string
    created_at?: Date
    updated_at?: Date
}

interface RegisterResponseProps{
    user: UsersRepositoryProps
}

export class RegisterUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({
        id,
        name,
        gender,
        email,
        password,
        cpf,
        cep,
    }: RegisterRequestProps): Promise<RegisterResponseProps>{
        
        if(password.length < 8 || password.length > 14){
            throw new PasswordLenghtError()
        }

        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            id,
            name,
            gender,
            email,
            password: password_hash,
            cpf,
            cep,
        })
        
        return {
            user
        }
    }


}