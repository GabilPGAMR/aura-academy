import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Curso, CursosService } from '../../services/cursos';
import { Sidebar } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-confirmacao',
  imports: [Sidebar, RouterLink],
  templateUrl: './confirmacao.html',
  styleUrl: './confirmacao.css',
})
export class Confirmacao implements OnInit {
  private cursosService = inject(CursosService);

  curso = signal<Curso | null>(null);

  ngOnInit() {
    this.curso.set(this.cursosService.getUltimoCursoCriado());
  }
}
