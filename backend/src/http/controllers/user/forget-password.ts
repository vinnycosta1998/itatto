import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeForgetPassword } from "../../../factories/user/make-forget-password";
import { UserNotFoundError } from "../../../errors/user-not-found-error";
import { Resend } from "resend";
import { env } from "../../../env";

const resend = new Resend(env.RESEND_API_KEY)

export async function forgetPassword(req: FastifyRequest, res:FastifyReply){
    const forgetPasswordBodyScehma = z.object({
        email: z.string().email()
    })

    const { email } = forgetPasswordBodyScehma.parse(req.body)

    try{
        const forgetPasswordUseCase = makeForgetPassword()

        const user = await forgetPasswordUseCase.execute({
            email
        })

        if(user){
            const {data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [user.user.email],
                subject: 'Recovery your password',
                html: '<a>Click here for recovery your password<a/>'
            })

            if(error){
                return console.error({ error })
            }

            console.log(data)
        }
    }catch(err){
        if(err instanceof UserNotFoundError){
            return res.status(404).send({
                message: 'Resource not found'
            })
        }
        console.error(err)
    }
}