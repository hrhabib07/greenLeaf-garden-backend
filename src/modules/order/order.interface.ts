export type TProductsData = {
  id: string;
  quantity: number;
  price: number;
};

export type TOrder = {
  name: string;
  phone: string;
  address: string;
  order: TProductsData[];
};
