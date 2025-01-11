import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Tambahkan ini
import {
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // Tambahkan ini untuk mendukung *ngFor dan *ngIf
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class Tab1Page implements OnInit {
  items: string[] = []; // Tipe eksplisit

  constructor() {}

  ngOnInit() {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 7; i++) {
      this.items.push(`kelas ${count + i}`); // Tidak ada lagi kesalahan tipe
    }
  }

  onIonInfinite(event: any) {
    this.generateItems();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
