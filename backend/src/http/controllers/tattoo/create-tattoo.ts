import type { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import { pipeline } from "stream";
import util from "util";

import { DescriptionHasLongError } from "../../../errors/description-has-long-error";
import { UploadImageError } from "../../../errors/upload-image-error";

import { z } from "zod";
import { makeCreateTattoo } from "../../../factories/tattoo/make-create-tattoo-use-case";

export async function createTattoo(req: FastifyRequest, res: FastifyReply) {
  const pump = util.promisify(pipeline);

  let title = "";
  let description = "";
  let genre = "";
  let imagePath = "";
  let user_id = "";

  try {
    const parts = req.parts({ limits: { fileSize: 8388608 } });

    // Loop para processar as partes do FormData (arquivos e campos de texto)
    for await (const part of parts) {
      if (part.type === "file") {
        // Tratando os arquivos do FormData
        if (part.file && part.filename) {
          const filePath = `./src/public/${part.filename}`;
          imagePath = filePath;
          await pump(part.file, fs.createWriteStream(filePath));
        }
      } else {
        // Tratando os campos textuais do FormData
        if (part.fieldname === "title") title = part.value;
        if (part.fieldname === "description") description = part.value;
        if (part.fieldname === "genre") genre = part.value;
        if (part.fieldname === "user_id") user_id = part.value;
      }
    }

    // Validação dos campos textuais com zod
    const createTattooBodySchema = z.object({
      title: z.string().min(2).max(24),
      description: z.string().min(2).max(60),
      genre: z.string(),
      user_id: z.string(),
    });

    createTattooBodySchema.parse({ title, description, genre, user_id });

    if (!imagePath) {
      throw new UploadImageError();
    }

    const createTattooUseCase = makeCreateTattoo();

    await createTattooUseCase.execute({
      title,
      description,
      genre,
      image: imagePath,
      user_id,
    });

    return res.status(201).send({ message: "Tattoo created successfully!" });
  } catch (err) {
    if (err instanceof DescriptionHasLongError) {
      return res.status(413).send({ message: "Payload too large" });
    }

    if (err instanceof UploadImageError) {
      return res.status(400).send({ message: err.message });
    }

    throw err;
  }
}
