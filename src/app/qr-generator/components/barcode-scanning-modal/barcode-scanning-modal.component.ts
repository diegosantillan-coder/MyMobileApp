import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
  StartScanOptions,
} from '@capacitor-mlkit/barcode-scanning';
import { Utilities } from '@core/constants/utilities.constants';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-barcode-scanning-modal',
  standalone: true,
  imports: [
    IonIcon,
    IonContent,
    IonButton,
    IonButtons,
    IonFabButton,
    IonToolbar,
    IonFab,
    IonFab,
    IonHeader,
  ],
  templateUrl: './barcode-scanning-modal.component.html',
  styleUrls: ['./barcode-scanning-modal.component.scss'],
})
export class BarcodeScanningModalComponent implements OnInit, AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.startScan();
    }, Utilities.doscientoscincuenta);
  }
  ngOnInit(): void {
    BarcodeScanner.isTorchAvailable().then((result) => {
      this.isTorchAvailable = result.available;
    });
  }
  ngOnDestroy(): void {
    this.stopScan();
  }

  @Input() public formats: BarcodeFormat[] = [];
  @Input() public lensFacing: LensFacing = LensFacing.Back;

  @ViewChild('square')
  public squareElement: ElementRef<HTMLDivElement> | undefined;

  public isTorchAvailable = false;
  private readonly ngZone = inject(NgZone);
  private readonly modalController = inject(ModalController);

  public async closeModal(barcode?: Barcode): Promise<void> {
    this.modalController.dismiss({ barcode });
  }

  public async toggleTorch(): Promise<void> {
    await BarcodeScanner.toggleTorch();
  }

  private async startScan(): Promise<void> {
    this.hideModal();
    const options: StartScanOptions = this.configureStartScanOptions();

    const squareElementBoundingClientRect =
      this.squareElement?.nativeElement.getBoundingClientRect();
    const scaledRect = squareElementBoundingClientRect
      ? {
          left: squareElementBoundingClientRect.left * window.devicePixelRatio,
          right: squareElementBoundingClientRect.right * window.devicePixelRatio,
          top: squareElementBoundingClientRect.top * window.devicePixelRatio,
          bottom: squareElementBoundingClientRect.bottom * window.devicePixelRatio,
          width: squareElementBoundingClientRect.width * window.devicePixelRatio,
          height: squareElementBoundingClientRect.height * window.devicePixelRatio,
        }
      : undefined;
    const detectionCornerPoints = scaledRect
      ? [
          [scaledRect.left, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top + scaledRect.height],
          [scaledRect.left, scaledRect.top + scaledRect.height],
        ]
      : undefined;
    const listener = await BarcodeScanner.addListener('barcodeScanned', async (event) => {
      this.ngZone.run(() => {
        const cornerPoints = event.barcode.cornerPoints;
        if (detectionCornerPoints && cornerPoints) {
          if (
            detectionCornerPoints[0][0] > cornerPoints[0][0] ||
            detectionCornerPoints[0][1] > cornerPoints[0][1] ||
            detectionCornerPoints[1][0] < cornerPoints[1][0] ||
            detectionCornerPoints[1][1] > cornerPoints[1][1] ||
            detectionCornerPoints[2][0] < cornerPoints[2][0] ||
            detectionCornerPoints[2][1] < cornerPoints[2][1] ||
            detectionCornerPoints[3][0] > cornerPoints[3][0] ||
            detectionCornerPoints[3][1] < cornerPoints[3][1]
          ) {
            return;
          }
        }
        listener.remove();
        this.closeModal(event.barcode);
      });
    });
    await BarcodeScanner.startScan(options);
  }

  private hideModal(): void {
    document.querySelector('body')?.classList.add('barcode-scanning-active');
  }

  private configureStartScanOptions(): StartScanOptions {
    return {
      formats: this.formats,
      lensFacing: this.lensFacing,
    };
  }

  private async stopScan(): Promise<void> {
    document.querySelector('body')?.classList.remove('barcode-scanning-active');
    await BarcodeScanner.stopScan();
  }
}
