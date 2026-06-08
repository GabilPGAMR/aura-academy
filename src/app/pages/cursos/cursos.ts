import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Curso, CursosService } from '../../services/cursos';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-cursos',
  imports: [Sidebar, RouterLink],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos implements OnInit {

  private cursosService = inject(CursosService);

  cursos = signal<Curso[]>([]);
  loading = signal(true);
  erro = signal('');
  filtro = signal('todos');

  cursosFiltrados = computed(() => {
    const filtroAtual = this.filtro();

    if (filtroAtual === 'todos') {
      return this.cursos();
    }

    return this.cursos().filter((curso) => curso.category === filtroAtual);
  });

  ngOnInit() {
    this.cursosService.getCursos().subscribe({
      next: (dados) => {
        this.cursos.set(dados);
        this.loading.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar cursos. Tente novamente mais tarde.');
        this.loading.set(false);
      }
    });
  }

  alterarFiltro(filtro: string) {
    this.filtro.set(filtro);
  }
}
