import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  aberta = signal(false);

  alternarMenu() {
    this.aberta.update((valor) => !valor);
  }

  fecharMenu() {
    this.aberta.set(false);
  }
}
