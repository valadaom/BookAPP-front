import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() modelValue: string = '';
  @Input() show: boolean = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();
}
