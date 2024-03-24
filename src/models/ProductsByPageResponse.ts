import { Product } from "./product";

export interface ProductsByPageResponse {
  data: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Product[];
    support: {
      url: string;
      text: string;
    };
  };
}
