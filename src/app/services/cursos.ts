import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private http = inject(HttpClient);

  private api = 'https://jsonplaceholder.typicode.com/posts';

  getCursos() {
    return this.http.get(this.api);
  }

  criarCurso(curso: any) {
    return this.http.post(this.api, curso);
  }
}