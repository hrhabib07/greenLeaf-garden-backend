export type TProduct = {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  image: string; // URL to the image
  brand: string;
  stock: number; // Available quantity in stock
  createdAt: Date;
  updatedAt: Date;
};
