import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableComponent } from './components/table/table.component';
import { ModalAddComponent } from './components/modal-add/modal-add.component';
import { ModalEditComponent } from './components/modal-edit/modal-edit.component';

@NgModule({
  declarations: [
    TableComponent,
    ModalAddComponent,
    ModalEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TableComponent,
    ModalAddComponent,
    ModalEditComponent
  ]
})
export class SharedModule { }
