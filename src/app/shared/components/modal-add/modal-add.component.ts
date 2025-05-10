import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss']
})
export class ModalAddComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() show: boolean = false;
  @Input() modelValue: string = '';

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<string>();
}
