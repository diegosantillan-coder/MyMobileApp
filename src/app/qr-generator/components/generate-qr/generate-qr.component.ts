import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { IonButton, IonIcon, IonTextarea } from '@ionic/angular/standalone'
import { QrCodeModule } from 'ng-qrcode'

@Component({
  selector: 'app-generate-qr',
  standalone: true,
  imports: [QrCodeModule, IonTextarea, IonButton, CommonModule, FormsModule, IonIcon],
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.scss'],
})
export class GenerateQrComponent {
  @Input() qrText: string = ''
  @Output() eventoScreen = new EventEmitter<void>()

  captureScreen(): void {
    this.eventoScreen.emit()
  }
}
