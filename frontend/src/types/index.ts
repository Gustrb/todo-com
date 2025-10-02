// Types based on backend models
export type User = {
  id: string;
  email: string;
  password_digest: string;
  is_active: boolean;
};

export type UserPayload = {
  email: string;
  password: string;
};

export type UserUpdatePayload = {
  updates: Array<keyof UserPayload>;
  updated: UserPayload;
};

export type ProductCurrency = "BRL";

export type Product = {
  id: string;
  title: string;
  unitaryCost: number;
  currency: ProductCurrency;
  quantity: number;
  is_active: boolean;
};

export type ProductPayload = {
  title: string;
  unitaryCost: number;
  currency: ProductCurrency;
  quantity: number;
};

export type ProductUpdatePayload = {
  updates: Array<keyof ProductPayload>;
  updated: ProductPayload;
};

export type ApiError = {
  error: string;
};

export type ApiResponse<T> = T | ApiError;
