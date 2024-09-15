import { hash } from "bcryptjs";
import { UsersRepository, UsersRepositoryProps } from "../../repositories/users-repository";
import { UserAlreadyExistsError } from "../../errors/user-already-exists-error";
import { PasswordLenghtError } from "../../errors/password-length-error";

interface RegisterUseCaseRequestProps{
    name: string
    gender: 'male' | 'female'
    email: string
    password: string
    cpf: string
    cep: string
    created_at?: Date
    updated_at?: Date
}

interface RegisterUsecaseResponseProps{
    user: UsersRepositoryProps
}

export class RegisterUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({
        name,
        gender,
        email,
        password,
        cpf,
        cep,
        created_at,
        updated_at
    }: RegisterUseCaseRequestProps): Promise<RegisterUsecaseResponseProps>{
        
        if(password.length < 8 || password.length > 14){
            throw new PasswordLenghtError()
        }

        const password_hash = await hash(password, 8)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }

        const user = await this.usersRepository.create({
            id: '1',
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