import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivrosComponent } from './pages/livros/livros.component';
import { AutoresComponent } from './pages/autores/autores.component';
import { AssuntosComponent } from './pages/assuntos/assuntos.component';

const routes: Routes = [
  { path: 'livros', component: LivrosComponent },
  { path: 'autores', component: AutoresComponent },
  { path: 'assuntos', component: AssuntosComponent },
  { path: '**', redirectTo: 'livros' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
