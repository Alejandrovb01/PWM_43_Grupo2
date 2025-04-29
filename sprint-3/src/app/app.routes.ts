// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { MenuComponent } from './menu/menu.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import {MenuQrComponent} from './menu-qr/menu-qr.component';
import {DishPageComponent} from './dish-page/dish-page.component';
import {KitchenPageComponent} from './kitchen-page/kitchen-page.component';

export const routes: Routes = [
  // Ruta independiente para login, sin Layout
  { path: 'login', component: LoginComponent },
  { path: 'kitchen', component: KitchenPageComponent },

  // Todas las demás usan el Layout
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'menu-qr', component: MenuQrComponent },
      { path: 'dish/:id', component: DishPageComponent },
    ]
  }
];
