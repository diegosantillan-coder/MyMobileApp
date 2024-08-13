import { inject, Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { LoadingService } from '@qr-generator/services/loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  htmlElement!: HTMLElement;

  private readonly loadingService = inject(LoadingService);

  //Capturar el html, convertirlo a canvas y obtener la imagen
  downloadImage(canvas: HTMLCanvasElement): void {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'qr.png';
    link.click();
  }

  //Compartir imagen para Mobile usando capacitor
  async sharedImage(canvas: HTMLCanvasElement): Promise<void> {
    let base64 = canvas.toDataURL();
    let path = 'qr.png';
    this.writeFile(path, base64);
  }

  private async deleteFile(path: string): Promise<void> {
    await Filesystem.deleteFile({
      path,
      directory: Directory.Cache,
    });
  }

  private async shareFile(url: string): Promise<void> {
    await Share.share({
      url,
    });
  }

  private async writeFile(path: string, data: string): Promise<void> {
    const loading = await this.loadingService.presentLoading();
    loading.present();
    await Filesystem.writeFile({
      path,
      data,
      directory: Directory.Cache,
    })
      .then(async (res) => {
        this.shareFile(res.uri);
        this.deleteFile(path);
      })
      .finally(() => {
        loading.dismiss();
      });
  }
}
