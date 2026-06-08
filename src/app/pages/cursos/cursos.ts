import { Component, OnInit, inject, signal } from '@angular/core';
import { CursosService } from '../../services/cursos';

@Component({
  selector: 'app-cursos',
  imports: [],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos implements OnInit {

  private cursosService = inject(CursosService);

  cursos = signal<any[]>([]);
  loading = signal(true);
  erro = signal('');

  ngOnInit() {
    this.cursosService.getCursos().subscribe({
      next: (dados: any) => {
        this.cursos.set(dados.slice(0, 10));
        this.loading.set(false);
      },
      error: () => {
        this.erro.set('Erro ao carregar cursos. Tente novamente mais tarde.');
        this.loading.set(false);
      }
    });
  }
}