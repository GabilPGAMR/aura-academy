import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

export interface Curso {
  id: number;
  title: string;
  body: string;
  category: string;
  level: string;
  duration: string;
  rating: string;
  image: string;
  badge: string;
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private http = inject(HttpClient);
  private api = 'https://jsonplaceholder.typicode.com/posts';
  private cursosCriadosKey = 'aura-academy-cursos-criados';
  private ultimoCursoKey = 'aura-academy-ultimo-curso';

  getCursos() {
    return this.http.get<any[]>(this.api).pipe(
      map((posts) => {
        const cursosBase: Omit<Curso, 'id'>[] = [
          {
            title: 'UX/UI Design Avançado',
            body: 'Aprenda prototipação, jornadas de usuário, design systems e testes de usabilidade aplicados em interfaces reais.',
            category: 'design',
            level: 'Avançado',
            duration: '32h',
            rating: '4.9',
            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
            badge: 'Design'
          },
          {
            title: 'Angular para Interfaces Web',
            body: 'Construa aplicações modernas com componentes, rotas, services, consumo de APIs, feedback visual e boas práticas.',
            category: 'frontend',
            level: 'Intermediário',
            duration: '28h',
            rating: '4.8',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600',
            badge: 'Frontend'
          },
          {
            title: 'Design Systems na Prática',
            body: 'Crie padrões visuais consistentes, tokens de design, componentes reutilizáveis e documentação para produtos digitais.',
            category: 'design',
            level: 'Intermediário',
            duration: '24h',
            rating: '4.9',
            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
            badge: 'Premium'
          },
          {
            title: 'APIs REST para Front-end',
            body: 'Entenda requisições GET e POST, tratamento de erro, estados de loading e integração com interfaces web.',
            category: 'backend',
            level: 'Básico',
            duration: '18h',
            rating: '4.7',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600',
            badge: 'API'
          },
          {
            title: 'Marketing Digital para Produtos',
            body: 'Planeje comunicação, funis, personas e estratégias de aquisição para plataformas educacionais e produtos digitais.',
            category: 'marketing',
            level: 'Básico',
            duration: '16h',
            rating: '4.6',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
            badge: 'Marketing'
          },
          {
            title: 'Acessibilidade e Usabilidade Web',
            body: 'Aplique heurísticas de usabilidade, contraste, feedback ao usuário, navegação intuitiva e estados de erro claros.',
            category: 'design',
            level: 'Essencial',
            duration: '20h',
            rating: '4.8',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
            badge: 'UX'
          },
          {
            title: 'JavaScript Funcional para UI',
            body: 'Domine eventos, arrays, funções, estados de interface e interações essenciais para aplicações web modernas.',
            category: 'frontend',
            level: 'Básico',
            duration: '22h',
            rating: '4.7',
            image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600',
            badge: 'JavaScript'
          },
          {
            title: 'Prototipação de Alta Fidelidade',
            body: 'Transforme ideias em telas navegáveis com padrões visuais sólidos, espaçamento, hierarquia e consistência.',
            category: 'design',
            level: 'Intermediário',
            duration: '14h',
            rating: '4.9',
            image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=600',
            badge: 'Figma'
          }
        ];

        const cursosDaApi = cursosBase.map((curso, index) => ({
          ...curso,
          id: posts[index]?.id ?? index + 1
        }));

        return [...this.getCursosCriados(), ...cursosDaApi];
      })
    );
  }

  criarCurso(curso: Omit<Curso, 'id'>) {
    return this.http.post<any>(this.api, curso).pipe(
      map((resposta) => ({
        ...curso,
        id: resposta?.id ?? Date.now()
      })),
      tap((cursoCriado) => {
        const cursosCriados = this.getCursosCriados();
        localStorage.setItem(this.cursosCriadosKey, JSON.stringify([cursoCriado, ...cursosCriados]));
        localStorage.setItem(this.ultimoCursoKey, JSON.stringify(cursoCriado));
      })
    );
  }

  getUltimoCursoCriado(): Curso | null {
    const salvo = localStorage.getItem(this.ultimoCursoKey);
    return salvo ? JSON.parse(salvo) as Curso : null;
  }

  private getCursosCriados(): Curso[] {
    const salvos = localStorage.getItem(this.cursosCriadosKey);
    return salvos ? JSON.parse(salvos) as Curso[] : [];
  }
}
