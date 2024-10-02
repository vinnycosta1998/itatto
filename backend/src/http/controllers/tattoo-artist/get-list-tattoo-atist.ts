import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";
import { z } from "zod";
import { makeGetListTattooArtist } from "../../../factories/tattoo-artist/make-get-list-tattoo-use-case";
import { TattooArtistNotFoundError } from "../../../errors/tattoo-artist-not-found-error";

export async function getListTattooartist(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const getListTattooArtistBodySchema = z.object({
    userId: z.string(),
  });

  const { userId } = getListTattooArtistBodySchema.parse(req.body);

  try {
    const getListTattooArtistUseCase = makeGetListTattooArtist();

    await getListTattooArtistUseCase.execute({ userId });

    return res.status(200).send({ message: "ok" });
  } catch (err) {
    if (err instanceof TattooArtistNotFoundError) {
      return res.status(404).send({ message: "Tattoo artist not found" });
    }
  }
}
