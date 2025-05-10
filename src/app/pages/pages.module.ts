import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LivrosComponent } from './livros/livros.component';
import { AutoresComponent } from './autores/autores.component';
import { AssuntosComponent } from './assuntos/assuntos.component';



@NgModule({
  declarations: [
    LivrosComponent,
    AutoresComponent,
    AssuntosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
