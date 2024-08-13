import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  Platform,
} from '@ionic/angular/standalone';
import html2canvas from 'html2canvas';
import { GenerateQrComponent } from './components/generate-qr/generate-qr.component';
import { ScanQrComponent } from './components/scan-qr/scan-qr.component';
import { CanvasService } from './services/canvas/canvas.service';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
  standalone: true,
  imports: [
    ScanQrComponent,
    GenerateQrComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonBackButton,
    IonTitle,
    IonLabel,
    IonContent,
    IonSegment,
    IonSegmentButton,
    FormsModule,
  ],
})
export class QrGeneratorPage {
  segment = 'scan';
  qrText = '';
  private readonly platform = inject(Platform);
  private readonly canvasService = inject(CanvasService);

  //Capturar el html, convertirlo a canvas y obtener la imagen
  captureScreen(): void {
    const element = document.getElementById('qrImage') as HTMLElement;
    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      if (this.platform.is('capacitor')) {
        this.canvasService.sharedImage(canvas);
      } else {
        this.canvasService.downloadImage(canvas);
      }
    });
  }
}
