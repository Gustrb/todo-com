import { Error, Result } from "../shared/result";
import { UpdatePayload, UserPayload } from "./handler";
import { User } from "./model";
import * as bcrypt from "bcrypt";

import * as repository from "./repository";

type UserDto = Omit<User, "password_digest">;

function mapUserToDto(user: User): UserDto {
  return {
    is_active: user.is_active,
    id: user.id,
    email: user.email,
  };
}

export async function createUser(
  payload: UserPayload,
): Promise<Result<UserDto>> {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const user = repository.create({
    email: payload.email,
    password_digest: hashedPassword,
  });

  if (user.is_error) {
    return Error(user.error);
  }

  return {
    val: mapUserToDto(user.val),
    is_error: false,
  };
}

export async function deleteUser(id: string): Promise<Result<void>> {
  const result = repository.deleteUserById(id);

  if (result.is_error) {
    return Error(result.error);
  }

  return {
    is_error: false,
    val: undefined,
  };
}

export async function listUsers(): Promise<Result<UserDto[]>> {
  const result = repository.list();

  if (result.is_error) {
    return Error(result.error);
  }

  return {
    is_error: false,
    val: result.val.map(mapUserToDto),
  };
}

export async function getUser(id: string): Promise<Result<UserDto>> {
  const result = repository.findUserById(id);

  if (result.is_error) {
    return Error(result.error);
  }

  return {
    is_error: false,
    val: mapUserToDto(result.val),
  };
}

export async function updateUser(
  id: string,
  payload: UpdatePayload,
): Promise<Result<Omit<User, "password_digest">>> {
  // Find the user
  const result = repository.findUserById(id);

  if (result.is_error) {
    return Error(result.error);
  }

  const u = { ...result.val };

  for (const key of payload.updates) {
    switch (key) {
      case "email":
        if (!payload.updated.email) {
          return Error("Email is required");
        }
        u.email = payload.updated.email;
        break;
      case "password":
        if (!payload.updated.password) {
          return Error("Password is required");
        }
        u.password_digest = await bcrypt.hash(payload.updated.password, 10);
        break;
    }
  }

  const updated = repository.save(u);

  if (updated.is_error) {
    return Error(updated.error);
  }

  return {
    is_error: false,
    val: mapUserToDto(updated.val),
  };
}
