import { Component, OnInit, signal } from '@angular/core';
import { Sidebar } from '../../shared/sidebar/sidebar';

interface PerfilUsuario {
  nome: string;
  usuario: string;
  email: string;
  bio: string;
  notificacoes: boolean;
  avatar: string;
  cargo: string;
}

@Component({
  selector: 'app-perfil',
  imports: [Sidebar],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  private perfilKey = 'aura-academy-perfil';

  salvo = signal(false);
  aviso = signal('');
  perfil = signal<PerfilUsuario>({
    nome: 'Estudante Aura',
    usuario: '@estudante_aura',
    email: 'aluno@email.com',
    bio: 'Apaixonado por tecnologia, design e construção de produtos digitais. Buscando evoluir em UI/UX e desenvolvimento Front-end.',
    notificacoes: true,
    avatar: 'https://i.pravatar.cc/150?img=68',
    cargo: 'Desenvolvedor Front-end'
  });

  ngOnInit() {
    const salvo = localStorage.getItem(this.perfilKey);

    if (salvo) {
      this.perfil.set(JSON.parse(salvo) as PerfilUsuario);
    }
  }

  salvarPerfil(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const perfilAtualizado: PerfilUsuario = {
      ...this.perfil(),
      nome: String(formData.get('nome') || '').trim() || this.perfil().nome,
      usuario: String(formData.get('usuario') || '').trim() || this.perfil().usuario,
      email: String(formData.get('email') || '').trim() || this.perfil().email,
      bio: String(formData.get('bio') || '').trim() || this.perfil().bio,
      notificacoes: formData.get('notificacoes') === 'on'
    };

    this.perfil.set(perfilAtualizado);
    localStorage.setItem(this.perfilKey, JSON.stringify(perfilAtualizado));

    this.aviso.set('');
    this.salvo.set(true);

    setTimeout(() => {
      this.salvo.set(false);
    }, 2200);
  }

  alterarFoto() {
    const imagens = [12, 32, 48, 56, 68, 70];
    const atual = this.perfil().avatar;
    const atualIndex = imagens.findIndex((img) => atual.includes(`img=${img}`));
    const proximoIndex = atualIndex === -1 ? 0 : (atualIndex + 1) % imagens.length;

    const perfilAtualizado = {
      ...this.perfil(),
      avatar: `https://i.pravatar.cc/150?img=${imagens[proximoIndex]}`
    };

    this.perfil.set(perfilAtualizado);
    localStorage.setItem(this.perfilKey, JSON.stringify(perfilAtualizado));
    this.aviso.set('Foto de perfil alterada.');
  }

  excluirConta() {
    this.aviso.set('Conta marcada para exclusão. Esta ação é apenas demonstrativa no protótipo.');
  }
}
