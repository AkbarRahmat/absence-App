import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Tambahkan CommonModule
import { IonButton, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone'; // Import komponen Ionic

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonHeader, IonToolbar, IonTitle, IonContent], // Tambahkan CommonModule
})
export class Tab3Page implements OnInit, OnDestroy {
  qrCodeImage: string | null = null;
  private timer: any;

  constructor() {}

  ngOnInit() {
    this.generateQRCode();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  generateQRCode() {
    this.qrCodeImage = 'assets/images/qr-1.png';

    this.timer = setTimeout(() => {
      this.qrCodeImage = null;
    }, 5000);
  }
}