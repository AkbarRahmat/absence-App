import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';  
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab3Page implements OnInit, OnDestroy {
  qrCodeImage: string | null = null;
  user: any = null;
  location: any = null;
  private timer: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUserData().subscribe(user => {
      if (user) {
        this.user = user;
        console.log('User data diterima di Tab3:', this.user);
      }
    });

    this.dataService.getLocationData().subscribe(location => {
      if (location) {
        this.location = location;
        console.log('Location data diterima di Tab3:', this.location);
      }
    });
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  async generateQRCode() {
    const timestamp = new Date();
    const formattedDate = timestamp.toLocaleDateString('id-ID');
    const formattedTime = timestamp.toLocaleTimeString('id-ID');

    if (this.user && this.location) {
      const data = {
        nama: this.user.fullName,
        nim: this.user.nim,
        waktu: timestamp.toISOString(),
        lokasi: {
          latitude: this.location.latitude,
          longitude: this.location.longitude,
        },
      };

      console.log('Data untuk QR Code:', data);

      try {
        this.qrCodeImage = await QRCode.toDataURL(JSON.stringify(data));
        console.log('QR Code berhasil dibuat');

        // Simpan ke history
        this.dataService.addHistory({
          date: formattedDate,
          time: formattedTime,
          status: 'Menunggu untuk discan',
          course: 'Generate QR',
          lecturer: '-'
        });

      } catch (err) {
        console.error('Gagal membuat QR Code:', err);
      }

      // Hapus QR setelah 5 detik
      this.timer = setTimeout(() => {
        this.qrCodeImage = null;
      }, 5000);
    } else {
      console.log('Data user atau lokasi belum tersedia');
    }
  }
}
