export type CartItem = {
  product: Product;
  size: number;
  quantity: number;
};

export type Product = {
  id: string;
  image: string;
  images?: string[];
  name: string;
  price?: number;
  sizes?: number[];
  description?: string;
};
