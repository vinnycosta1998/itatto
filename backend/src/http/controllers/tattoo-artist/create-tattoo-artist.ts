import { FastifyRequest, FastifyReply } from "fastify";

import fs from "fs";
import { pipeline } from "stream";
import util from "util";
import { z } from "zod";
import { UploadImageError } from "../../../errors/upload-image-error";
import { makeCreateTattooArtist } from "../../../factories/tattoo-artist/make-create-tattoo-artist-use-case";

export async function CreateTattoArtist(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const pump = util.promisify(pipeline);

  let name = "";
  let bio = "";
  let image = "";
  let phone = "";
  let cep = "";
  let street = "";
  let neighborhood = "";
  let city = "";

  try {
    const parts = req.parts({ limits: { fileSize: 8.388608 } });

    for await (const part of parts) {
      if (part.type === "file") {
        if (part.file && part.filename) {
          const filePath = `./src/public/${part.filename}`;
          image = filePath;
          await pump(part.file, fs.createWriteStream(filePath));
        }
      } else {
        if (part.fieldname === "name") name = part.value;
        if (part.fieldname === "bio") bio = part.value;
        if (part.fieldname === "phone") phone = part.value;
        if (part.fieldname === "cep") cep = part.value;
        if (part.fieldname === "street") street = part.value;
        if (part.fieldname === "neighborhood") neighborhood = part.value;
        if (part.fieldname === "city") city = part.value;
      }
    }

    const createTattoArtistBodySchema = z.object({
      name: z.string().min(2).max(24),
      bio: z.string().min(12).max(240),
      phone: z.string(),
      cep: z.string(),
      street: z.string(),
      neighborhood: z.string(),
      city: z.string(),
    });

    createTattoArtistBodySchema.parse({
      name,
      bio,
      phone,
      cep,
      street,
      neighborhood,
      city,
    });

    if (!image) {
      throw new UploadImageError();
    }

    const createTattooArtistUseCase = makeCreateTattooArtist();

    await createTattooArtistUseCase.execute({
      name,
      bio,
      image,
      phone,
      cep,
      street,
      neighborhood,
      city,
    });

    return res.status(201).send({
      mesage: "Tattoo artist created successfully",
    });
  } catch (err) {
    if (err instanceof UploadImageError) {
      return res.status(400).send({ message: err.message });
    }
  }
}
