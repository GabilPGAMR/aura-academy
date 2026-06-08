import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Curso, CursosService } from '../../services/cursos';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-novo-curso',
  imports: [Sidebar, RouterLink],
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
    const duracao = String(formData.get('duracao') || '').trim();

    if (!titulo || titulo.length < 3) {
      this.erro.set('Informe um título com pelo menos 3 caracteres.');
      return;
    }

    if (!descricao || descricao.length < 10) {
      this.erro.set('Informe uma descrição com pelo menos 10 caracteres.');
      return;
    }

    const novoCurso: Omit<Curso, 'id'> = {
      title: titulo,
      body: descricao,
      category: categoria || 'design',
      duration: duracao || '12h',
      level: 'Novo',
      rating: '5.0',
      image: this.getImagemPorCategoria(categoria),
      badge: this.getBadgePorCategoria(categoria)
    };

    this.loading.set(true);

    this.cursosService.criarCurso(novoCurso).subscribe({
      next: () => {
        this.loading.set(false);
        this.sucesso.set('Curso criado com sucesso! Redirecionando...');

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

  private getBadgePorCategoria(categoria: string) {
    const badges: Record<string, string> = {
      design: 'Design',
      frontend: 'Frontend',
      backend: 'API',
      marketing: 'Marketing'
    };

    return badges[categoria] ?? 'Novo';
  }

  private getImagemPorCategoria(categoria: string) {
    const imagens: Record<string, string> = {
      design: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
      frontend: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600',
      backend: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
      marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600'
    };

    return imagens[categoria] ?? imagens['design'];
  }
}
