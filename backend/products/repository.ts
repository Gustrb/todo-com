import { v4 as uuidv4 } from "uuid";
import { Result, Error } from "../shared/result";

import type { Product } from "./model";

export type Filter = {
  title: string | undefined;
};

const products: Product[] = [];

export function create(
  product: Omit<Product, "id" | "is_active">,
): Result<Product> {
  const newProduct = { ...product, id: uuidv4(), is_active: true };
  products.push(newProduct);
  return { val: newProduct, is_error: false };
}

export function save(product: Product): Result<Product> {
  if (!product.id) {
    return Error("Product ID is required");
  }

  const index = products.findIndex((p) => p.id === product.id);
  if (index == -1) {
    return Error("Product not found");
  }

  products[index] = product;

  return { val: product, is_error: false };
}

export function deleteProductById(id: string): Result<null> {
  const index = products.findIndex((p) => p.id === id);
  if (index == -1) {
    return Error("Product not found");
  }

  if (!products[index]) {
    return Error("Product not found");
  }

  products[index].is_active = false;

  return { is_error: false, val: null };
}

export function list({ title }: Filter): Result<Product[]> {
  const fns: ((p: Product) => boolean)[] = [(p: Product) => p.is_active];

  if (title) {
    fns.push((p: Product) => p.title.includes(title));
  }

  return {
    val: products.filter((p) => fns.every((fn) => fn(p))),
    is_error: false,
  };
}

export function findProductById(id: string): Result<Product> {
  const product = products.find((p) => p.id === id);
  if (!product) {
    return Error("Product not found");
  }

  return { val: product, is_error: false };
}
