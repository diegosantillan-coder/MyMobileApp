import { Component } from '@angular/core'
import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/angular/standalone'

@Component({
  selector: 'app-scan-qr',
  standalone: true,
  imports: [IonRow, IonCol, IonButton, IonIcon],
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.scss'],
})
export class ScanQrComponent {}
