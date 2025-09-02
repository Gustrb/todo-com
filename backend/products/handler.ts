import { Request, Response } from "express";
import { ProductCurrency } from "./model";
import * as service from "./service";

export type ProductPayload = {
  title: string;
  unitaryCost: number;
  currency: ProductCurrency;
  quantity: number;
};

function validateProduct(body: any): asserts body is ProductPayload {
  if (!body.title || typeof body.title !== "string") {
    throw new Error("Invalid title");
  }

  if (!body.unitaryCost || typeof body.unitaryCost !== "number") {
    throw new Error("Invalid unitaryCost");
  }

  if (!body.currency || typeof body.currency !== "string") {
    throw new Error("Invalid currency");
  }

  if (!body.quantity || typeof body.quantity !== "number") {
    throw new Error("Invalid quantity");
  }
}

export type UpdatePayload = {
  updates: Array<keyof ProductPayload>;
  updated: ProductPayload;
};

function validateUpdate(body: any): asserts body is UpdatePayload {
  if (!body.updates || !body.updated) {
    throw new Error("Invalid update");
  }

  if (!body.updates.every((update: string) => update in body.updated)) {
    throw new Error("Invalid update");
  }
}

export async function createProduct(req: Request, res: Response) {
  // TODO: middleware to catch exceptions
  validateProduct(req.body);

  const result = await service.createProduct(req.body);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(201).json(result.val);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(404);
    return;
  }

  const result = await service.deleteProduct(id);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(204).send();
}

export async function updateProduct(req: Request, res: Response) {
  validateUpdate(req.body);

  const { id } = req.params;
  if (!id) {
    res.status(404);
    return;
  }

  const result = await service.updateProduct(id, req.body);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(204).send();
}

// TODO: Implement pagination
export async function listProducts(req: Request, res: Response) {
  const { title } = req.query;

  if (title) {
    if (typeof title !== "string") {
      res.status(400).json({ error: "title must be a string" });
      return;
    }
  }

  const result = await service.listProducts(title);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(200).json(result.val);
}

export async function getProduct(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(404);
    return;
  }

  const result = await service.getProduct(id);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(200).json(result.val);
}
