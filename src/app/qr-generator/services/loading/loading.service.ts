import { inject, Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private readonly loadingController = inject(LoadingController);

  async presentLoading():Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      spinner: 'crescent'
    });
    return loading;
  }
}
