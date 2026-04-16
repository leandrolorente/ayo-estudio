import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'modalidades',
    loadComponent: () =>
      import('./modalidades/modalidades').then(m => m.ModalidadesPage)
  }
];
