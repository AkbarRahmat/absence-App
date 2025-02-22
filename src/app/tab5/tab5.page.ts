import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Tambahkan IonicModule
import { DataService } from '../services/data.service';
import * as L from 'leaflet'; // Library peta Leaflet

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class Tab5Page implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  user: any = {}; // Menyimpan data user
  location: any = { latitude: null, longitude: null, address: 'Fetching location...' };

  private map: any;
  private marker: any;
  private watchId: string | null = null;

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    // Ambil data user dan lokasi dari DataService
    this.dataService.getUserData().subscribe(user => {
      if (user) {
        this.user = user;
        console.log('User data diterima di Tab5:', this.user);
      }
    });

    this.dataService.getLocationData().subscribe(location => {
      if (location) {
        this.location = location;
        console.log('Location data diterima di Tab5:', this.location);
      }
    });

    try {
      await this.initializeMap(); 
      this.trackLocation(); 
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  ngOnDestroy() {
    if (this.watchId !== null) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }

  async initializeMap() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      this.location.latitude = latitude;
      this.location.longitude = longitude;

      this.location.address = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
      this.dataService.setLocationData(this.location);

      console.log('Location data dikirim ke DataService:', this.location);

      // **Inisialisasi Peta**
      this.map = L.map(this.mapContainer.nativeElement).setView([latitude, longitude], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.marker = L.marker([latitude, longitude], {
        icon: L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(this.map).bindPopup('Lokasi anda').openPopup();
    } catch (error) {
      console.error('Gagal mendapatkan lokasi:', error);
    }
  }

  trackLocation() {
    Geolocation.watchPosition({}, (position, error) => {
      if (error) {
        console.error('Error watching position:', error);
        this.location.address = 'Unable to fetch location';
        return;
      }

      if (position) {
        const { latitude, longitude } = position.coords;

        this.location.latitude = latitude;
        this.location.longitude = longitude;

        this.location.address = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
        this.dataService.setLocationData(this.location);

        if (this.marker) {
          this.marker.setLatLng([latitude, longitude]);
        }

        if (this.map) {
          this.map.setView([latitude, longitude], 15);
        }
      }
    }).then(id => {
      this.watchId = id; 
    }).catch(error => {
      console.error('Gagal watch posisi:', error);
    });
  }
}
