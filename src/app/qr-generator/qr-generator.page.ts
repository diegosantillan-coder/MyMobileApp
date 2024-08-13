import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSegment, IonLabel, IonSegmentButton, IonText, IonTextarea, IonButton, IonIcon, IonRow, IonCol } from '@ionic/angular/standalone';
import { QrCodeModule } from 'ng-qrcode';
import html2canvas from 'html2canvas';
import { CanvasService } from './services/canvas/canvas.service';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonIcon, IonButton, IonTextarea, IonText, IonSegmentButton, IonLabel, IonSegment, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, QrCodeModule]
})
export class QrGeneratorPage {
  segment = 'scan';
  qrText = '';
  private readonly platform = inject(Platform);
  private readonly canvasService = inject(CanvasService);

  //Capturar el html, convertirlo a canvas y obtener la imagen
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;
    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      if (this.platform.is('capacitor')) {
        this.canvasService.sharedImage(canvas);
      } else {
        this.canvasService.downloadImage(canvas);
      }
    })
  }

}
