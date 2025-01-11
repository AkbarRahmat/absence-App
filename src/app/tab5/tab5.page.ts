import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: true,
})
export class Tab5Page implements OnInit, OnDestroy {
  user = {
    fullName: 'John Doe',
    nim: '1234567890',
    email: 'johndoe@example.com',
    profilePicture: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  };

  location = {
    latitude: null as number | null,
    longitude: null as number | null,
    address: 'Fetching location...',
  };

  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  private watchId: string | null = null;

  constructor() {}

  async ngOnInit() {
    try {
      await this.initializeMap();
      this.trackLocation();
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }

  ngOnDestroy() {
    if (this.watchId !== null) {
      Geolocation.clearWatch({ id: this.watchId }); // Stop watching location updates
    }
  }

  async initializeMap() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;

      this.location.latitude = latitude;
      this.location.longitude = longitude;

      // Initialize map with user's current location
      this.map = L.map('map', { zoomControl: false }).setView([latitude, longitude], 15);

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(this.map);

      // Add marker for current position
      this.marker = L.marker([latitude, longitude], {
        draggable: true, // Make marker draggable if needed
      }).addTo(this.map).bindPopup('You are here!').openPopup();
    } catch (error) {
      console.error('Error initializing map:', error);
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

        // Update location data
        this.location.latitude = latitude;
        this.location.longitude = longitude;

        // Update marker position
        if (this.marker) {
          this.marker.setLatLng([latitude, longitude]); // Update marker with new position
        }

        // Center map on new position
        if (this.map) {
          this.map.setView([latitude, longitude], 15); // Update map center
        }

        // Update address (simulate reverse geocoding)
        this.location.address = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`;
      }
    }).then((watchId) => {
      this.watchId = watchId;
    });
  }
}
