import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  HostListener,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroXMark, heroExclamationTriangle, heroCheckCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, A11yModule, NgIconComponent],
  providers: [provideIcons({ heroXMark, heroExclamationTriangle, heroCheckCircle })],
  template: `
    <div
      *ngIf="isOpen"
      (click)="closeModal()"
      role="dialog"
      [attr.aria-modal]="true"
      [attr.aria-labelledby]="titleId"
      [attr.aria-describedby]="contentId"
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;"
    >
      <div
        #modalContent
        (click)="$event.stopPropagation()"
        cdkTrapFocus
        cdkTrapFocusAutoCapture
        style="background: white; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;"
      >
        <header style="display: flex; justify-content: space-between; align-items: center; padding: 20px; border-bottom: 1px solid #dee2e6;">
          <h2 [id]="titleId" style="margin: 0; color: #333;">{{ title }}</h2>
          <button
            type="button"
            (click)="closeModal()"
            [attr.aria-label]="'Fechar ' + title"
            cdkFocusInitial
            style="background: none; border: none; cursor: pointer; padding: 5px; color: #6c757d; border-radius: 4px; display: flex; align-items: center; justify-content: center;"
          >
            <ng-icon name="heroXMark" aria-hidden="true"></ng-icon>
          </button>
        </header>

        <main [id]="contentId" style="padding: 20px;">
          <ng-content></ng-content>
        </main>

        <footer *ngIf="showFooter" style="padding: 20px; border-top: 1px solid #dee2e6; display: flex; gap: 10px; justify-content: flex-end;">
          <button
            type="button"
            (click)="closeModal()"
            style="padding: 8px 16px; border: 1px solid transparent; border-radius: 4px; cursor: pointer; font-size: 14px; background: #6c757d; color: white;"
          >
            Cancelar
          </button>
          <button
            type="button"
            (click)="confirmAction()"
            style="padding: 8px 16px; border: 1px solid transparent; border-radius: 4px; cursor: pointer; font-size: 14px; background: #007bff; color: white;"
          >
            {{ confirmText }}
          </button>
        </footer>
      </div>
    </div>
  `
})
export class ModalComponent implements OnChanges, OnInit {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() showFooter = false;
  @Input() confirmText = 'Confirmar';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  @ViewChild('modalContent') modalContent!: ElementRef;

  titleId = '';
  contentId = '';

  private previousFocus: Element | null = null;

  ngOnInit() {
    this.titleId = `modal-title-${this.generateId()}`;
    this.contentId = `modal-content-${this.generateId()}`;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.previousFocus = document.activeElement as HTMLElement;
        document.body.classList.add('modal-open');
      } else {
        document.body.classList.remove('modal-open');
        if (this.previousFocus) {
          (this.previousFocus as HTMLElement).focus();
        }
      }
    }
  }


  @HostListener('keydown.escape')
  onEscape() {
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
  }

  confirmAction() {
    this.confirm.emit();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }
}
