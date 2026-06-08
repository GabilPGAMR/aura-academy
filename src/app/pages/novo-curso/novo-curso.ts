import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from '../../services/cursos';

@Component({
  selector: 'app-novo-curso',
  imports: [],
  templateUrl: './novo-curso.html',
  styleUrl: './novo-curso.css',
})
export class NovoCurso {

  private cursosService = inject(CursosService);
  private router = inject(Router);

  loading = signal(false);
  erro = signal('');
  sucesso = signal('');

  criarCurso(event: Event) {
    event.preventDefault();

    this.erro.set('');
    this.sucesso.set('');

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const titulo = String(formData.get('titulo') || '').trim();
    const descricao = String(formData.get('descricao') || '').trim();
    const categoria = String(formData.get('categoria') || '').trim();

    if (!titulo || titulo.length < 3) {
      this.erro.set('Informe um título com pelo menos 3 caracteres.');
      return;
    }

    if (!descricao || descricao.length < 10) {
      this.erro.set('Informe uma descrição com pelo menos 10 caracteres.');
      return;
    }

    const novoCurso = {
      title: titulo,
      body: descricao,
      category: categoria || 'geral',
      userId: 1
    };

    this.loading.set(true);

    this.cursosService.criarCurso(novoCurso).subscribe({
      next: () => {
        this.loading.set(false);
        this.sucesso.set('Curso criado com sucesso!');

        setTimeout(() => {
          this.router.navigate(['/confirmacao']);
        }, 1000);
      },
      error: () => {
        this.loading.set(false);
        this.erro.set('Erro ao criar curso. Tente novamente.');
      }
    });
  }
}