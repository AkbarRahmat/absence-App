import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { KelasService } from '../services/kelas.service';

interface Kelas {
  kode_prodi: string;
  kode_mk: string;
  kategori: string;
  periode: string;
  id_boc: string;
  status_mk: string;
  email: string;
  kelas: string;
  hari: string;
  jam_mulai: string;
  jam_selesai: string;
}

interface ClassItem {
  name: string;
  expanded: boolean;
  periods: Period[];
  details: Kelas;
}

interface Period {
  name: string;
  status: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page implements OnInit {
  classes: ClassItem[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  currentDay: string = '';

  constructor(
    private kelasService: KelasService,
    private alertController: AlertController,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.currentDay = this.getCurrentDay();
    this.fetchKelas();
  }

  fetchKelas() {
    this.isLoading = true;
    this.errorMessage = '';
    console.log('Fetching kelas...');

    this.kelasService.getKelas().subscribe({
      next: (response: any) => {
        console.log('Raw response:', response);
        try {
          if (!response || !response.data) {
            throw new Error('Invalid response format');
          }

          this.classes = response.data
            .filter((item: Kelas) => item.kelas.startsWith('IF23') && item.hari === this.currentDay)
            .map((item: Kelas) => ({
              name: `${item.kode_mk} - ${item.kelas}`,
              expanded: false,
              periods: this.generatePeriods(item),
              details: item
            }))
            .sort((a: ClassItem, b: ClassItem) => {
              const startTimeA = this.convertTimeToMinutes(a.details.jam_mulai);
              const startTimeB = this.convertTimeToMinutes(b.details.jam_mulai);
              return startTimeA - startTimeB;
            });

          console.log('Sorted classes:', this.classes);
        } catch (error) {
          this.errorMessage = 'Error processing data';
          console.error('Error processing data:', error);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching kelas:', error);
        this.errorMessage = 'Error loading data';
        this.isLoading = false;
      }
    });
  }

  generatePeriods(item: Kelas): Period[] {
    return Array.from({ length: 16 }, (_, i) => ({
      name: `Pertemuan-${i + 1}`,
      status: this.determinePeriodStatus(i + 1, item)
    }));
  }

  determinePeriodStatus(pertemuanNumber: number, item: Kelas): string {
    const today = new Date();
    const currentWeek = this.getCurrentWeek(today);
    const weekOfMeeting = this.calculateMeetingWeek(pertemuanNumber);

    if (weekOfMeeting < currentWeek) {
      return 'closed';
    } else if (weekOfMeeting === currentWeek) {
      const now = this.getCurrentTimeInMinutes();
      const endTime = this.convertTimeToMinutes(item.jam_selesai);

      // Jika waktu sudah melewati jam_selesai, status diubah menjadi "closed"
      if (now > endTime) {
        return 'closed';
      }
      return 'ongoing';
    } else {
      return 'coming soon';
    }
  }

  getCurrentDay(): string {
    const daysOfWeek = ['', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const today = new Date();
    return daysOfWeek[today.getDay()];
  }

  getCurrentWeek(date: Date): number {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startDate.getDay() + 1) / 7);
  }

  calculateMeetingWeek(pertemuanNumber: number): number {
    const startSemesterDate = new Date(2024, 0, 29);
    const startWeek = this.getCurrentWeek(startSemesterDate);
    return startWeek + (pertemuanNumber - 1);
  }

  async handlePeriodClick(period: Period, classItem: ClassItem) {
    console.log('Clicked period:', period);
    console.log('Class details:', classItem.details);

    if (period.status === 'closed') {
      this.showAlert('Maaf presensi telah ditutup !');
    } else if (period.status === 'coming soon') {
      this.showAlert('Maaf presensi belum tersedia !');
    } else if (period.status === 'ongoing') {
      const waktuMulai = this.convertTimeToMinutes(classItem.details.jam_mulai);
      const waktuSekarang = this.getCurrentTimeInMinutes();
      const waktuSelesai = this.convertTimeToMinutes(classItem.details.jam_selesai);

      if (waktuSekarang > waktuSelesai) {
        this.showAlert('Maaf presensi telah ditutup !');
      } else if (waktuSekarang < waktuMulai) {
        const selisih = waktuMulai - waktuSekarang;
        const countdownText = `Presensi dimulai ${this.formatCountdown(selisih)} lagi !`;
        this.showAlert(countdownText);
      } else {
        this.navController.navigateForward('/tabs/tab3');
      }
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Informasi',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  getCurrentTimeInMinutes(): number {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  }

  formatCountdown(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} jam ${mins} menit` : `${mins} menit`;
  }

  toggleExpand(index: number) {
    this.classes[index].expanded = !this.classes[index].expanded;
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

  convertTimeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
