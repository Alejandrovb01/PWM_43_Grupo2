import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { FavoritesService } from './services/favorites.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
  standalone: true,
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private favoritesService: FavoritesService
  ) {
    this.platform.ready().then(() => {
      this.favoritesService.initDb()
        .then(() => console.log('✅ SQLite inicializado desde AppComponent'))
        .catch(err => console.error('❌ Error inicializando SQLite:', err));
    });
  }
}
