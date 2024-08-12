import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonItem, IonLabel, IonThumbnail, IonBackButton } from '@ionic/angular/standalone';
import { Product } from '../core/interfaces/product.interface';
import { ProductsService } from '../service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonLabel, IonItem, IonList, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar,IonMenuButton,IonThumbnail, CommonModule, FormsModule]
})
export class ProductListPage implements OnInit  {

products: Product[] = [];
productService = inject(ProductsService)

async ngOnInit() {
  const response = await this.productService.getAll();
  this.products = response.results;
  console.log('Current Navigation:', this.router.getCurrentNavigation());
}

constructor(private router: Router) {}



}
