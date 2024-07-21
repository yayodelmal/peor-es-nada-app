import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'publicaciones/listar',
    pathMatch: 'full',
  },
  {
    path: 'publicaciones/listar',
    loadComponent: () => import('./publicaciones/listar/listar.component').then((m) => m.ListarComponent),
  },
];
