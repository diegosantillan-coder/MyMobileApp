import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductResponse } from '../core/models/product.class';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpClient = inject(HttpClient);

  getAll(): Promise<ProductResponse> {
    return firstValueFrom(
      this.httpClient.get<ProductResponse>('https://peticiones.online/api/products')
    )
  }
}
