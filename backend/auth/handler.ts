import { Request, Response } from "express";
import * as service from "./service";

export type UserPayload = {
  email: string;
  password: string;
};

function validateUser(body: any): asserts body is UserPayload {
  if (!body.email || !body.password) {
    throw new Error("Invalid user");
  }
}

export type UpdatePayload = {
  updates: Array<keyof UserPayload>;
  updated: UserPayload;
};

function validateUpdate(body: any): asserts body is UpdatePayload {
  if (!body.updates || !body.updated) {
    throw new Error("Invalid update");
  }

  if (!body.updates.every((update: string) => update in body.updated)) {
    throw new Error("Invalid update");
  }
}

export async function createUser(req: Request, res: Response) {
  // TODO: middleware to catch exceptions
  validateUser(req.body);

  const result = await service.createUser(req.body);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(201).json(result.val);
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(404);
    return;
  }

  const result = await service.deleteUser(id);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(204).send();
}

export async function updateUser(req: Request, res: Response) {
  validateUpdate(req.body);

  const { id } = req.params;
  if (!id) {
    res.status(404);
    return;
  }

  const result = await service.updateUser(id, req.body);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(204).send();
}

export async function listUsers(req: Request, res: Response) {
  const result = await service.listUsers();

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(200).json(result.val);
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) {
    res.status(404);
    return;
  }

  const result = await service.getUser(id);

  if (result.is_error) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(200).json(result.val);
}
