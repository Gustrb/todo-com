import { Error, Result } from "../shared/result";
import { UpdatePayload, ProductPayload } from "./handler";
import { Product } from "./model";

import * as repository from "./repository";

export type ProductDto = Product;

function mapProductToDto(product: Product): ProductDto {
  return {
    id: product.id,
    title: product.title,
    unitaryCost: product.unitaryCost,
    currency: product.currency,
    quantity: product.quantity,
    is_active: product.is_active,
  };
}

export async function createProduct(
  payload: ProductPayload,
): Promise<Result<ProductDto>> {
  const product = repository.create({
    title: payload.title,
    unitaryCost: payload.unitaryCost,
    currency: payload.currency,
    quantity: payload.quantity,
  });

  if (product.is_error) {
    return Error(product.error);
  }

  return {
    val: mapProductToDto(product.val),
    is_error: false,
  };
}

export async function deleteProduct(id: string): Promise<Result<void>> {
  const result = repository.deleteProductById(id);

  if (result.is_error) {
    return Error(result.error);
  }

  return {
    is_error: false,
    val: undefined,
  };
}

export async function listProducts(
  title?: string,
): Promise<Result<ProductDto[]>> {
  const result = repository.list({
    title,
  });

  if (result.is_error) {
    return Error(result.error);
  }

  return {
    is_error: false,
    val: result.val.map(mapProductToDto),
  };
}

export async function getProduct(id: string): Promise<Result<ProductDto>> {
  const result = repository.findProductById(id);

  if (result.is_error) {
    return Error(result.error);
  }

  return {
    is_error: false,
    val: mapProductToDto(result.val),
  };
}

export async function updateProduct(
  id: string,
  payload: UpdatePayload,
): Promise<Result<ProductDto>> {
  // Find the user
  const result = repository.findProductById(id);

  if (result.is_error) {
    return Error(result.error);
  }

  const u = { ...result.val };

  for (const key of payload.updates) {
    switch (key) {
      case "title":
        u.title = payload.updated.title;
        break;
      case "unitaryCost":
        u.unitaryCost = payload.updated.unitaryCost;
        break;
      case "currency":
        u.currency = payload.updated.currency;
        break;
      case "quantity":
        u.quantity = payload.updated.quantity;
        break;
    }
  }

  const updated = repository.save(u);

  if (updated.is_error) {
    return Error(updated.error);
  }

  return {
    is_error: false,
    val: mapProductToDto(updated.val),
  };
}
