import { Router } from "express";
import * as handler from "./handler";

export function urls(): Router {
  const router = Router();

  router.post("/", handler.createProduct);
  router.put("/:id", handler.updateProduct);
  router.get("/", handler.listProducts);
  router.get("/:id", handler.getProduct);
  router.delete("/:id", handler.deleteProduct);

  return router;
}
