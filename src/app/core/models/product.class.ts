import { Product } from '../interfaces/product.interface'

export class ProductResponse {
  constructor(
    public page: number,
    public per_page: number,
    public total: number,
    public total_pages: number,
    public results: Product[],
  ) {}
}
