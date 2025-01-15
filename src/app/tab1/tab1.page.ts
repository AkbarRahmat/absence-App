import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
  ],
})
export class Tab1Page implements OnInit {
  classes: {
    name: string;
    expanded: boolean;
    periods: { name: string; status: string }[];
  }[] = []; // Definisikan tipe data

  constructor() {}

  ngOnInit() {
    this.generateClasses();
  }

  private generateClasses() {
    this.classes = [
      {
        name: 'Basis Data',
        expanded: false,
        periods: [
          { name: 'Pertemuan-1', status: 'closed' },
          { name: 'Pertemuan-2', status: 'closed' },
          { name: 'Pertemuan-3', status: 'ongoing' },
          { name: 'Pertemuan-4', status: 'coming soon' },
          { name: 'Pertemuan-5', status: 'coming soon' },
          { name: 'Pertemuan-6', status: 'coming soon' },
          { name: 'Pertemuan-7', status: 'coming soon' },
          { name: 'Pertemuan-8', status: 'coming soon' },
          { name: 'Pertemuan-9', status: 'coming soon' },
          { name: 'Pertemuan-10', status: 'coming soon' },
          { name: 'Pertemuan-11', status: 'coming soon' },
          { name: 'Pertemuan-12', status: 'coming soon' },
          { name: 'Pertemuan-13', status: 'coming soon' },
          { name: 'Pertemuan-14', status: 'coming soon' },
          { name: 'Pertemuan-15', status: 'coming soon' },
          { name: 'Pertemuan-16', status: 'coming soon' },
        ],
      },
      {
        name: 'Manajemen Proyek',
        expanded: false,
        periods: [
          { name: 'Pertemuan-1', status: 'closed' },
          { name: 'Pertemuan-2', status: 'closed' },
          { name: 'Pertemuan-3', status: 'ongoing' },
          { name: 'Pertemuan-4', status: 'coming soon' },
          { name: 'Pertemuan-5', status: 'coming soon' },
          { name: 'Pertemuan-6', status: 'coming soon' },
          { name: 'Pertemuan-7', status: 'coming soon' },
          { name: 'Pertemuan-8', status: 'coming soon' },
          { name: 'Pertemuan-9', status: 'coming soon' },
          { name: 'Pertemuan-10', status: 'coming soon' },
          { name: 'Pertemuan-11', status: 'coming soon' },
          { name: 'Pertemuan-12', status: 'coming soon' },
          { name: 'Pertemuan-13', status: 'coming soon' },
          { name: 'Pertemuan-14', status: 'coming soon' },
          { name: 'Pertemuan-15', status: 'coming soon' },
          { name: 'Pertemuan-16', status: 'coming soon' },
        ],
      },
      {
        name: 'Jaringan Komputer',
        expanded: false,
        periods: [
          { name: 'Pertemuan-1', status: 'closed' },
          { name: 'Pertemuan-2', status: 'closed' },
          { name: 'Pertemuan-3', status: 'ongoing' },
          { name: 'Pertemuan-4', status: 'coming soon' },
          { name: 'Pertemuan-5', status: 'coming soon' },
          { name: 'Pertemuan-6', status: 'coming soon' },
          { name: 'Pertemuan-7', status: 'coming soon' },
          { name: 'Pertemuan-8', status: 'coming soon' },
          { name: 'Pertemuan-9', status: 'coming soon' },
          { name: 'Pertemuan-10', status: 'coming soon' },
          { name: 'Pertemuan-11', status: 'coming soon' },
          { name: 'Pertemuan-12', status: 'coming soon' },
          { name: 'Pertemuan-13', status: 'coming soon' },
          { name: 'Pertemuan-14', status: 'coming soon' },
          { name: 'Pertemuan-15', status: 'coming soon' },
          { name: 'Pertemuan-16', status: 'coming soon' },
        ],
      },
      {
        name: 'Keamanan Jaringan',
        expanded: false,
        periods: [
          { name: 'Pertemuan-1', status: 'closed' },
          { name: 'Pertemuan-2', status: 'ongoing' },
          { name: 'Pertemuan-3', status: 'coming soon' },
          { name: 'Pertemuan-4', status: 'coming soon' },
          { name: 'Pertemuan-5', status: 'coming soon' },
          { name: 'Pertemuan-6', status: 'coming soon' },
          { name: 'Pertemuan-7', status: 'coming soon' },
          { name: 'Pertemuan-8', status: 'coming soon' },
          { name: 'Pertemuan-9', status: 'coming soon' },
          { name: 'Pertemuan-10', status: 'coming soon' },
          { name: 'Pertemuan-11', status: 'coming soon' },
          { name: 'Pertemuan-12', status: 'coming soon' },
          { name: 'Pertemuan-13', status: 'coming soon' },
          { name: 'Pertemuan-14', status: 'coming soon' },
          { name: 'Pertemuan-15', status: 'coming soon' },
          { name: 'Pertemuan-16', status: 'coming soon' },
        ],
      },
    ];
  }

  toggleExpand(index: number) {
    this.classes[index].expanded = !this.classes[index].expanded;
  }

  handlePeriodClick(period: { name: string; status: string }) {
    console.log('Clicked period:', period);
    // Tambahkan logika lain jika diperlukan
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'coming soon':
        return 'status-blue';
      case 'ongoing':
        return 'status-yellow';
      case 'closed':
        return 'status-gray';
      default:
        return '';
    }
  }
}
