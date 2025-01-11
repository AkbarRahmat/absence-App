import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon],
})
export class Tab4Page implements OnInit {
  history: { date: string; time: string; status: string; course: string; lecturer: string }[] = [];

  ngOnInit() {
    this.history = [
      { date: '2024-12-01', time: '08:00', status: 'Hadir', course: 'Pemrograman Web', lecturer: 'Dr. Ir. Sutanto' },
      { date: '2024-11-30', time: '10:00', status: 'Izin', course: 'Basis Data', lecturer: 'Dr. Dewi Lestari' },
      { date: '2024-11-29', time: '13:00', status: 'Hadir', course: 'Jaringan Komputer', lecturer: 'Dr. Budi Santoso' },
      { date: '2024-11-28', time: '09:30', status: 'Tidak Hadir', course: 'Algoritma', lecturer: 'Dr. Susi Susanti' },
    ];
  }
}
