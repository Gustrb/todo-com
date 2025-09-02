import { Router } from "express";
import * as handler from "./handler";

export function urls(): Router {
  const router = Router();

  router.post("/", handler.createUser);
  router.put("/:id", handler.updateUser);
  router.get("/", handler.listUsers);
  router.get("/:id", handler.getUser);
  router.delete("/:id", handler.deleteUser);

  return router;
}
