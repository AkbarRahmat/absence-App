import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Untuk mendukung direktif seperti *ngIf dan *ngFor
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
  ],
})
export class Tab2Page {}
