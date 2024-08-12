import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then(m => m.MainPage)
  },
  {
    path: 'product-list',
    loadComponent: () => import('./product-list/product-list.page').then( m => m.ProductListPage)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./gallery/gallery.page').then( m => m.GalleryPage)
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];
