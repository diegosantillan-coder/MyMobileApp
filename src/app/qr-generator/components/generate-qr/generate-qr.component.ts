import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QrCodeModule } from 'ng-qrcode';
import { IonTextarea, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-qr',
  standalone: true,
  imports: [QrCodeModule, IonTextarea, IonButton, CommonModule, FormsModule, IonIcon],
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.scss'],
})
export class GenerateQrComponent {
  @Input() qrText: string = '';
  @Output() eventoScreen = new EventEmitter<void>();
  constructor() { }

  captureScreen() {
    this.eventoScreen.emit();
  }
}
