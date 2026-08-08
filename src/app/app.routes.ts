import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./cards/cards.component').then((m) => m.CardsComponent),
  },
];
