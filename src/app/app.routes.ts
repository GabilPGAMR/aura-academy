import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadComponent: () =>
      import('./pages/login/login')
      .then(m => m.Login)
  },

  { path: 'dashboard', loadComponent: () =>
      import('./pages/dashboard/dashboard')
      .then(m => m.Dashboard)
  },

  { path: 'cursos', loadComponent: () =>
      import('./pages/cursos/cursos')
      .then(m => m.Cursos)
  },

  { path: 'novo-curso', loadComponent: () =>
      import('./pages/novo-curso/novo-curso')
      .then(m => m.NovoCurso)
  },

  { path: 'perfil', loadComponent: () =>
      import('./pages/perfil/perfil')
      .then(m => m.Perfil)
  },

  { path: 'confirmacao', loadComponent: () =>
      import('./pages/confirmacao/confirmacao')
      .then(m => m.Confirmacao)
  },

  { path: '**', redirectTo: 'login' }
];