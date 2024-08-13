import { Component, inject, OnInit } from '@angular/core';
import { BarcodeScanner, LensFacing } from '@capacitor-mlkit/barcode-scanning';
import {
  IonButton,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  ModalController,
  Platform,
} from '@ionic/angular/standalone';
import { BarcodeScanningModalComponent } from '@qr-generator/components/barcode-scanning-modal/barcode-scanning-modal.component';

@Component({
  selector: 'app-scan-qr',
  standalone: true,
  imports: [
    IonLabel,
    IonInput,
    IonItem,
    IonRow,
    IonCol,
    IonButton,
    IonIcon,
    BarcodeScanningModalComponent,
  ],
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent implements OnInit {
  scantResult = '';
  private readonly modalController = inject(ModalController);
  private readonly platform = inject(Platform);

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then();
      BarcodeScanner.checkPermissions().then();
      BarcodeScanner.removeAllListeners();
    }
  }

  async startScan(): Promise<void> {
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        LensFacing: LensFacing.Back,
      },
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.scantResult = data?.barcode?.displayValue;
    }
  }
}
