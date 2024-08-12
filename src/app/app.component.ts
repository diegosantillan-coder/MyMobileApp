import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp,IonMenu, IonHeader,IonToolbar, IonContent,IonTitle, IonList, IonLabel, IonRouterOutlet,IonMenuToggle, IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonIcon, IonRouterOutlet, IonLabel, IonList, IonTitle, IonContent, IonApp,IonMenu,IonHeader,IonToolbar,IonMenuToggle, RouterLink],
})
export class AppComponent {
  constructor() {}
}
