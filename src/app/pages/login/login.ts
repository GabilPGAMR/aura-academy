import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private router = inject(Router);

  loading = signal(false);
  erro = signal('');

  entrar(event: Event) {
    event.preventDefault();

    this.erro.set('');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (!email || !email.includes('@')) {
      this.erro.set('Informe um e-mail válido.');
      return;
    }

    if (!password || password.length < 6) {
      this.erro.set('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    this.loading.set(true);

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }
}