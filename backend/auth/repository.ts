import { v4 as uuidv4 } from "uuid";
import { Result, Error } from "../shared/result";

import type { User } from "./model";

const users: User[] = [];

export function create(user: Omit<User, "id" | "is_active">): Result<User> {
  const newUser = { ...user, id: uuidv4(), is_active: true };
  users.push(newUser);
  return { val: newUser, is_error: false };
}

export function save(user: User): Result<User> {
  if (!user.id) {
    return Error("User ID is required");
  }

  const index = users.findIndex((u) => u.id === user.id);
  if (index == -1) {
    return Error("User not found");
  }

  users[index] = user;

  return { val: user, is_error: false };
}

export function deleteUserById(id: string): Result<null> {
  const index = users.findIndex((u) => u.id === id);
  if (index == -1) {
    return Error("User not found");
  }

  if (!users[index]) {
    return Error("User not found");
  }

  users[index].is_active = false;

  return { is_error: false, val: null };
}

export function list(): Result<User[]> {
  return { val: users.filter((u) => u.is_active), is_error: false };
}

export function findUserById(id: string): Result<User> {
  const user = users.find((u) => u.id === id);
  if (!user) {
    return Error("User not found");
  }

  return { val: user, is_error: false };
}
