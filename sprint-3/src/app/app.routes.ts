import { Routes } from '@angular/router';
import {DishPageNoQrComponent} from './dish-page-no-qr/dish-page-no-qr.component';

export const routes: Routes = [  { path: '', redirectTo: 'dish-page-no-qr', pathMatch: 'full' },
  { path: 'dish-page-no-qr', component: DishPageNoQrComponent }
];
