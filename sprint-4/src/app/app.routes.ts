import { Routes } from '@angular/router';
//import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'app',
    //canActivate: [authGuard],
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent)
      },
      {
        path: 'dish/:id',
        loadComponent: () => import('./pages/dish-page/dish-page.component').then(m => m.DishPageComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites/favorites.page').then( m => m.FavoritesPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];
