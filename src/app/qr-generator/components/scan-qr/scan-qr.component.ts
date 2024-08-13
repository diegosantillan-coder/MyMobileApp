import { Component } from '@angular/core';
import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/angular/standalone';
import { BarcodeScanningModalComponent } from '@qr-generator/components/barcode-scanning-modal/barcode-scanning-modal.component';

@Component({
  selector: 'app-scan-qr',
  standalone: true,
  imports: [IonRow, IonCol, IonButton, IonIcon, BarcodeScanningModalComponent],
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent {}
