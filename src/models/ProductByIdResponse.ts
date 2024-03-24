import { Product } from "./product";

export interface ProductByIdResponse {
  data: {
    data: Product;
    support: {
      url: string;
      text: string;
    };
  };
}
