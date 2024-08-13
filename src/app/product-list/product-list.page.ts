import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone'
import { Product } from '../core/interfaces/product.interface'
import { ProductsService } from '../service/products.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [
    IonBackButton,
    IonLabel,
    IonItem,
    IonList,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonThumbnail,
    CommonModule,
    FormsModule,
  ],
})
export class ProductListPage implements OnInit {
  products: Product[] = []
  productService = inject(ProductsService)

  async ngOnInit(): Promise<void> {
    const response = await this.productService.getAll()
    this.products = response.results
    //console.log('Current Navigation:', this.router.getCurrentNavigation())
  }

  constructor(private router: Router) {}
}
