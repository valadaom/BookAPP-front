import { Component, OnInit } from '@angular/core';
import { Autor } from 'src/app/shared/models/autor.model';
import { ApiService } from 'src/app/shared/api.service';
import { ToastService } from 'src/app/shared/services/toast.service'; // Importar o ToastService

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

  constructor(private api: ApiService, private toast: ToastService) {} // Injeção do ToastService

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
      this.api.put('autor', { codAu: this.autorEditando.codAu, nome }, this.autorEditando.codAu)
        .subscribe({
          next: () => {
            this.toast.showSuccess('Autor atualizado com sucesso!');  // Exibe sucesso
            this.fecharModal();
            this.carregarAutores();
          },
          error: () => this.toast.showError('Erro ao atualizar autor.')  // Exibe erro
        });
    } else {
      this.api.post('autor', payload).subscribe({
        next: () => {
          this.toast.showSuccess('Autor adicionado com sucesso!');  // Exibe sucesso
          this.fecharModal();
          this.carregarAutores();
        },
        error: () => this.toast.showError('Erro ao adicionar autor.')  // Exibe erro
      });
    }
  }

  excluirAutor(autor: Autor) {
    this.api.delete('autor', autor.codAu).subscribe({
      next: () => {
        this.toast.showSuccess('Autor excluído!');  // Exibe sucesso
        this.carregarAutores();
      },
      error: () => this.toast.showError('Erro ao excluir autor.')  // Exibe erro
    });
  }
}
