import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeForgetPassword } from "../../../factories/user/make-forget-password";
import { UserNotFoundError } from "../../../errors/user-not-found-error";

export async function forgetPassword(req: FastifyRequest, res:FastifyReply){
    const forgetPasswordBodyScehma = z.object({
        email: z.string().email()
    })

    const { email } = forgetPasswordBodyScehma.parse(req.body)

    try{
        const forgetPasswordUseCase = makeForgetPassword()

        await forgetPasswordUseCase.execute({
            email
        })
    }catch(err){
        if(err instanceof UserNotFoundError){
            return res.status(404).send({
                message: 'Resource not found'
            })
        }
        console.error(err)
    }
}