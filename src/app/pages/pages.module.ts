import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivrosComponent } from './livros/livros.component';
import { AutoresComponent } from './autores/autores.component';
import { AssuntosComponent } from './assuntos/assuntos.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    LivrosComponent,
    AutoresComponent,
    AssuntosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ]
})
export class PagesModule { }
