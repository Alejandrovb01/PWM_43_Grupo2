import {Routes} from "@angular/router";

export const routes: Routes = [
  /*{
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  },*/
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./menu/menu.component').then(m => m.MenuComponent)
      },
      {
        path: 'dish/:id',
        loadComponent: () => import('./dish-page/dish-page.component').then(m => m.DishPageComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
