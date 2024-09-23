import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetListTattoo } from "../../../factories/tattoo/make-get-list-tattoo";
import { EmpytListTattoosError } from "../../../errors/empyt-list-tattos-error";

export async function getListTattoo(req: FastifyRequest, res:FastifyReply){
    const getListTattooBodySchema = z.object({
        userId: z.string(),
        page: z.coerce.number()
    })

    const { userId, page } = getListTattooBodySchema.parse(req.body)

    try{
        const getListTattooUseCase = makeGetListTattoo()

        await getListTattooUseCase.execute({
            userId,
            page
        })
    }catch(err){
        if(err instanceof EmpytListTattoosError){
            return res.status(204).send({
                messagte: 'Empyt list'
            })
        }
        console.error(err)
    }
}