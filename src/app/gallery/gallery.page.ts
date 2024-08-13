import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { PhotosService } from '../service/photos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonRow,
    IonGrid,
    IonImg,
    IonIcon,
    IonFabButton,
    IonFab,
    IonButtons,
    IonButton,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class GalleryPage {
  photos: string[] = [];
  photoService = inject(PhotosService);

  constructor() {
    this.photos = this.photoService.photos;
  }

  async takePhoto(): Promise<void> {
    await this.photoService.addNewPhoto();
  }
}
