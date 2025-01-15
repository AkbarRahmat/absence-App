import { Component, EnvironmentInjector, inject } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonCard, IonCardContent, IonRouterOutlet} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square, heart, diamond, home, chatbubbles, code, qrCode, document, person } from 'ionicons/icons';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    standalone: true,
    imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonFab, IonFabButton, IonCard, IonCardContent, IonRouterOutlet],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  private router = inject(Router); // Inject Router


  constructor() {
    addIcons({ home, chatbubbles, qrCode, document, person});
  }
  navigateToTab3() {
    this.router.navigate(['/tabs/tab3']); // Navigate to tab3
  }
}
