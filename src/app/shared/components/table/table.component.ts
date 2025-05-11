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
  @Output() delete = new EventEmitter<any>();


  getCellValue(row: any, key: string): string {
  const parts = key.split('.');

  const value = row[parts[0]];

  if (Array.isArray(value) && parts.length === 2) {
    return value.map((v: any) => v[parts[1]]).join(', ');
  }

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return parts.reduce((acc, part) => acc?.[part], row) ?? '';
}
}
