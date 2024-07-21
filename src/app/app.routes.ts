import { Routes } from '@angular/router'; // Importa el tipo Routes desde Angular Router

// Define las rutas para la aplicación
export const routes: Routes = [
  {
    // Ruta raíz ('') que redirige a 'publicaciones/listar'
    path: '',
    redirectTo: 'publicaciones/listar', // Redirige a la ruta 'publicaciones/listar'
    pathMatch: 'full', // Especifica que la redirección debe coincidir con toda la URL
  },
  {
    // Ruta para 'publicaciones/listar'
    path: 'publicaciones/listar',
    loadComponent: () => import('./publicaciones/listar/listar.component').then((m) => m.ListarComponent), // Carga el componente ListarComponent de manera diferida
  },
];
