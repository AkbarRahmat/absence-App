// kelas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class KelasService {
  private apiUrl = `aapi/kelas/Bu4n4p3rju4ngan/20241`;

  constructor(private http: HttpClient) {}

  getKelas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}