import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { DataService } from './services/data.service';
import { IonicStorageModule } from '@ionic/storage-angular';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, ],
})
export class AppComponent implements OnInit {
  constructor(private dataService: DataService) {}

  async ngOnInit() {
    // Simpan data user sejak awal
    const user = {
      fullName: 'John Doe',
      nim: '2316255221324',
      email: 'johndoe@mhs.ubpkarawang.ac.id',
      profilePicture: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    };
    this.dataService.setUserData(user);

    // Ambil lokasi user
    try {
      const position = await Geolocation.getCurrentPosition();
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        address: `Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`,
      };
      this.dataService.setLocationData(location);
    } catch (error) {
      console.error('Gagal mendapatkan lokasi:', error);
    }
  }
}
