import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonButtons, IonFab, IonFabButton, IonIcon, IonImg } from '@ionic/angular/standalone';
import { PhotosService } from '../service/photos.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: true,
  imports: [IonImg, IonIcon, IonFabButton, IonFab, IonButtons, IonButton, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GalleryPage   {

  photos: string[] = [];
  photoService = inject(PhotosService);

  constructor(){
    this.photos = this.photoService.photos;
  }

  async takePhoto() {
    await this.photoService.addNewPhoto();
  }
}
