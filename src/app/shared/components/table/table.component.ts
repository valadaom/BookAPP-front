import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() keys: string[] = [];
  @Input() data: any[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<number>();
}
