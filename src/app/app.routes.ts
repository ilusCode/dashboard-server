import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then((m) => m.HomePage),
    },
    {
        path: 'register-app',
        loadComponent: () => import('./pages/register-app-page/register-app-page').then((m) => m.RegisterAppPage),
    },
    {
        path: '**',
        redirectTo: 'home',
    }
];
