import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Platform, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonSegment, IonLabel, IonSegmentButton, IonText, IonTextarea, IonButton, IonIcon, LoadingController } from '@ionic/angular/standalone';
import { QrCodeModule } from 'ng-qrcode';
import html2canvas from 'html2canvas';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.page.html',
  styleUrls: ['./qr-generator.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonTextarea, IonText, IonSegmentButton, IonLabel, IonSegment, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, QrCodeModule]
})
export class QrGeneratorPage {
  segment = 'generate';
  qrText = '';
  constructor(private loadingController: LoadingController,
              private platForm: Platform
  ) { }

  //Capturar el html, convertirlo a canvas y obtener la imagen
  captureScreen() {
    const element = document.getElementById('qrImage') as HTMLElement;
    html2canvas(element).then((canvas: HTMLCanvasElement) => {
      if (this.platForm.is('capacitor')) {
        this.sharedImage(canvas)
      } else {
        this.downloadImageWeb(canvas);
      }
    })
  }

  //Descargar imagen web
  downloadImageWeb(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  //Compartir imagen para Mobile usando capacitor
  async sharedImage(canvas: HTMLCanvasElement) {
    let base64 = canvas.toDataURL();
    let path = 'qr.png';
    const loading = await this.presentLoading();
    loading.present();

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {
      let uri = res.uri;
      await Share.share({
        url: uri,
      });

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      })
    }).finally(() => {
    loading.dismiss();
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'crescent'
    });
    return loading;
  }





}
