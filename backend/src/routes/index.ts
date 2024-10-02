import type { FastifyInstance } from "fastify";
import { register } from "../http/controllers/user/register";
import { authenticate } from "../http/controllers/user/authenticate";
import { getUserProfile } from "../http/controllers/user/get-profile";
import { forgetPassword } from "../http/controllers/user/forget-password";

import { createTattoo } from "../http/controllers/tattoo/create-tattoo";
import { deleteTattoo } from "../http/controllers/tattoo/delete-tattoo";
import { SearchManyTattoo } from "../http/controllers/tattoo/search-many-tattoo";
import { updateDescriptionTattoo } from "../http/controllers/tattoo/update-description-tattoo";
import { updateGenreTattoo } from "../http/controllers/tattoo/update-genre-tattoo";
import { updateImageTattoo } from "../http/controllers/tattoo/update-image-tattoo";
import { updateTitleTattoo } from "../http/controllers/tattoo/update-title-tattoo";
import { getListTattoo } from "../http/controllers/tattoo/get-list-tattoo";
import { updatePassword } from "../http/controllers/user/update-password";
import { verifyJWT } from "../http/middlewares/verify-jwt";
import { CreateTattoArtist } from "../http/controllers/tattoo-artist/create-tattoo-artist";
import { getListTattooArtist } from "../http/controllers/tattoo-artist/get-list-tattoo-atist";

export async function appRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/authenticate", authenticate);
  app.post("/forget-password", forgetPassword);
  app.get("/me", { onRequest: [verifyJWT] }, getUserProfile);
  app.post("/update-password", { onRequest: [verifyJWT] }, updatePassword);

  // Tatto routes
  app.post("/create-tattoo", { onRequest: [verifyJWT] }, createTattoo);
  app.delete("/delete-tattoo", { onRequest: [verifyJWT] }, deleteTattoo);
  app.post("/search-tattoo", { onRequest: [verifyJWT] }, SearchManyTattoo);
  app.put(
    "/update-description",
    { onRequest: [verifyJWT] },
    updateDescriptionTattoo,
  );
  app.put("/update-genre", { onRequest: [verifyJWT] }, updateGenreTattoo);
  app.put("/update-image", { onRequest: [verifyJWT] }, updateImageTattoo);
  app.put("/update-title", { onRequest: [verifyJWT] }, updateTitleTattoo);
  app.post("/list-tattoos", { onRequest: [verifyJWT] }, getListTattoo);

  // Tattoo artist routes
  app.post(
    "/create-tattoo-artist",
    { onRequest: [verifyJWT] },
    CreateTattoArtist,
  );

  app.get(
    "/list-tattoo-artist",
    { onRequest: [verifyJWT] },
    getListTattooArtist,
  );
}
