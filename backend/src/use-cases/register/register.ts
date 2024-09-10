import { hash } from "bcryptjs";
import { UsersRepository, UsersRepositoryProps } from "../../repositories/users-repository";

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
        const password_hash = await hash(password, 8)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new Error("user already exists")
        }

        const user = await this.usersRepository.create({
            id:  
            name,
            email,
            password: password_hash,
            gender: "male",
            cpf,
            cep,
            name: ""
        })
        
        return {
            user
        }
    }


}