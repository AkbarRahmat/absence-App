import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userDataSubject = new BehaviorSubject<any>(null);
  private locationDataSubject = new BehaviorSubject<any>(null);
  private historySubject = new BehaviorSubject<any[]>([]); // Tambahkan untuk menyimpan history

  constructor() {}

  // Setter untuk user data
  setUserData(user: any) {
    console.log('User data disimpan:', user);
    this.userDataSubject.next(user);
  }

  // Getter untuk user data
  getUserData() {
    return this.userDataSubject.asObservable();
  }

  // Setter untuk lokasi
  setLocationData(location: any) {
    console.log('Location data disimpan:', location);
    this.locationDataSubject.next(location);
  }

  // Getter untuk lokasi
  getLocationData() {
    return this.locationDataSubject.asObservable();
  }

  // Setter untuk menambahkan riwayat generate QR
  addHistory(entry: any) {
    const currentHistory = this.historySubject.getValue();
    this.historySubject.next([entry, ...currentHistory]); // Tambah ke awal list
  }

  // Getter untuk mengambil history
  getHistory() {
    return this.historySubject.asObservable();
  }
}
