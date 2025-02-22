import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonCard, IonCardContent, IonRouterOutlet, IonBadge } from '@ionic/angular/standalone'; 
import { addIcons } from 'ionicons';
import { home, chatbubbles, qrCode, document, person, notifications } from 'ionicons/icons';
import { KelasService } from '../services/kelas.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [CommonModule, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonCard, IonCardContent, IonRouterOutlet, IonBadge], // ✅ Tambahkan CommonModule
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  private router = inject(Router);
  notificationCount: number = 0;

  constructor(private kelasService: KelasService) {
    addIcons({ home, chatbubbles, qrCode, document, person, notifications });
    this.fetchNotificationCount();
    setInterval(() => this.fetchNotificationCount(), 60000);
  }

  navigateToTab3() {
    this.router.navigate(['/tabs/tab3']);
  }

  fetchNotificationCount() {
    this.kelasService.getKelas().subscribe({
      next: (response: any) => {
        if (!response || !response.data) {
          this.notificationCount = 0;
          return;
        }

        const now = new Date();
        const currentDay = this.getHari(now);
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const notifications = response.data.filter((item: any) => {
          if (!item.kelas.startsWith('IF23')) return false;
          if (item.hari !== currentDay) return false;

          const startMinutes = this.convertToMinutes(item.jam_mulai);
          const endMinutes = this.convertToMinutes(item.jam_selesai);

          return currentTime >= startMinutes && currentTime <= endMinutes;
        });

        this.notificationCount = notifications.length;
      },
      error: () => {
        this.notificationCount = 0;
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

