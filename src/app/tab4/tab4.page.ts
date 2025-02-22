import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
} from '@ionic/angular/standalone';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonList, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonIcon],
})
export class Tab4Page implements OnInit {
  history: { date: string; time: string; status: string; course: string; lecturer: string }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getHistory().subscribe(history => {
      this.history = history;
    });
  }
}
