export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}