export type ProductCurrency = "BRL";

export type Product = {
  id: string;
  title: string;
  unitaryCost: number;
  currency: ProductCurrency;
  quantity: number;
  is_active: boolean;
};
