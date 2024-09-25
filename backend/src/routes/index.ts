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

export async function appRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/authenticate", authenticate);
  app.get("/me", getUserProfile);
  app.post("/forget-password", forgetPassword);

  // Tatto routes
  app.post("/create-tattoo", createTattoo);
  app.delete("/delete-tattoo", deleteTattoo);
  app.post("/search-tattoo", SearchManyTattoo);
  app.put("/update-description", updateDescriptionTattoo);
  app.put("/update-genre", updateGenreTattoo);
  app.put("/update-image", updateImageTattoo);
  app.put("/update-title", updateTitleTattoo);
  app.post("/list-tattoos", getListTattoo);
}
