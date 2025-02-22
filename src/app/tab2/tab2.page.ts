import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { KelasService } from '../services/kelas.service';

interface Kelas {
  kode_mk: string;
  kelas: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class Tab2Page implements OnInit {
  notifications: Kelas[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private kelasService: KelasService) {}

  ngOnInit() {
    this.fetchNotifications();
    setInterval(() => this.fetchNotifications(), 60000); // Update setiap 1 menit
  }

  fetchNotifications() {
    this.isLoading = true;
    this.kelasService.getKelas().subscribe({
      next: (response: any) => {
        if (!response || !response.data) {
          this.notifications = [];
          return;
        }

        const now = new Date();
        const currentDay = this.getHari(now);
        const currentTime = now.getHours() * 60 + now.getMinutes();

        this.notifications = response.data.filter((item: Kelas) => {
          if (!item.kelas.startsWith('IF23')) return false;
          if (item.hari !== currentDay) return false;

          const startMinutes = this.convertToMinutes(item.jam_mulai);
          const endMinutes = this.convertToMinutes(item.jam_selesai);

          return currentTime >= startMinutes && currentTime <= endMinutes;
        });

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching notifications:', error);
        this.errorMessage = 'Gagal mengambil notifikasi';
        this.isLoading = false;
      },
    });
  }

  getHari(date: Date): string {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[date.getDay()];
  }

  convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}

