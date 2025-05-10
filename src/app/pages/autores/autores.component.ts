import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/shared/models/autor.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html'
})
export class AutoresComponent implements OnInit {
  autores: Autor[] = [];

  showAddModal = false;
  showEditModal = false;

  autorNome = '';
  autorEditando: Autor | null = null;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.carregarAutores();
  }

  carregarAutores() {
    this.api.get<Autor[]>('autor').subscribe(data => this.autores = data);
  }

  abrirModalAdd() {
    this.autorNome = '';
    this.showAddModal = true;
  }

  abrirModalEdit(autor: Autor) {
    this.autorEditando = autor;
    this.autorNome = autor.nome;
    this.showEditModal = true;
  }

  fecharModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.autorNome = '';
    this.autorEditando = null;
  }

  salvarAutor(nome: string) {
    if (!nome.trim()) return;

    const payload = { nome };

    if (this.autorEditando) {
      this.api.put('autor', this.autorEditando.codAu, { codAu: this.autorEditando.codAu, nome })
        .subscribe(() => {
          this.fecharModal();
          this.carregarAutores();
        });
    } else {
      this.api.post('autor', payload).subscribe(() => {
        this.fecharModal();
        this.carregarAutores();
      });
    }
  }

  excluirAutor(id: number) {
    this.api.delete('autor', id).subscribe(() => this.carregarAutores());
  }
}
