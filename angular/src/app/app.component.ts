import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark, heroExclamationTriangle, heroCheckCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalComponent, CommonModule, NgIconComponent],
  providers: [provideIcons({ heroXMark, heroExclamationTriangle, heroCheckCircle })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  activeComponent = 'menu';
  isModalOpen = false;
  focusedMenuIndex = 0;

  menuItems = [
    {
      id: 'buttons',
      label: 'Botões Acessíveis vs Inacessíveis',
      description: 'Demonstra diferença entre botões acessíveis e inacessíveis'
    },
    {
      id: 'form',
      label: 'Formulário Acessível',
      description: 'Formulário com validação e acessibilidade completa'
    },
    {
      id: 'modal',
      label: 'Modal Acessível',
      description: 'Modal com gerenciamento de foco e navegação por teclado'
    }
  ];

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmAction() {
    alert('Ação confirmada!');
    this.isModalOpen = false;
  }

  setActiveComponent(componentId: string) {
    this.activeComponent = componentId;
  }

  goBackToMenu() {
    this.activeComponent = 'menu';
  }

  onMenuKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedMenuIndex = this.focusedMenuIndex < this.menuItems.length - 1 ? this.focusedMenuIndex + 1 : 0;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedMenuIndex = this.focusedMenuIndex > 0 ? this.focusedMenuIndex - 1 : this.menuItems.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.setActiveComponent(this.menuItems[this.focusedMenuIndex].id);
        break;
    }
  }
}
