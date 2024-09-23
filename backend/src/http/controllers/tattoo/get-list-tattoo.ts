import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetListTattoo } from "../../../factories/tattoo/make-get-list-tattoo";
import { EmpytListTattoosError } from "../../../errors/empyt-list-tattos-error";

export async function getListTattoo(req: FastifyRequest, res:FastifyReply){
    
    const getListTattooBodySchema = z.object({
        userId: z.string(),
        page: z.coerce.number().min(1)
    })
    
    const { userId, page } = getListTattooBodySchema.parse(req.body)
    console.log('Request Body:', req.body);

    try{
        const getListTattooUseCase = makeGetListTattoo()

        const tattoos = await getListTattooUseCase.execute({
            userId,
            page
        })

        return res.status(200).send({
            tattoos
        });
    }catch(err){
        if(err instanceof EmpytListTattoosError){
            return res.status(204).send({
                messagte: 'Empyt list'
            })
        }
        console.error(err)
    }
}