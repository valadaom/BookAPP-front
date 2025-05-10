import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/shared/models/livro.model';
import { Autor } from 'src/app/shared/models/autor.model';
import { Assunto } from 'src/app/shared/models/assunto.model';
import { ApiService } from 'src/app/shared/api.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html'
})
export class LivrosComponent implements OnInit {
  livros: Livro[] = [];
  autores: Autor[] = [];
  assuntos: Assunto[] = [];

  showAddModal = false;
  showEditModal = false;

  livro: Livro = this.novoLivro();
  editandoLivro: Livro | null = null;

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit(): void {
    this.carregarLivros();
    this.carregarAutores();
    this.carregarAssuntos();
  }

  novoLivro(): Livro {
    return {
      codL: 0,
      titulo: '',
      editora: '',
      edicao: 1,
      anoPublicacao: '',
      autoresIds: [],
      assuntosIds: []
    };
  }

  carregarLivros() {
    this.api.get<Livro[]>('livro').subscribe(res => this.livros = res);
  }

  carregarAutores() {
    this.api.get<Autor[]>('autor').subscribe(res => this.autores = res);
  }

  carregarAssuntos() {
    this.api.get<Assunto[]>('assunto').subscribe(res => this.assuntos = res);
  }

  abrirModalAdd() {
    this.livro = this.novoLivro();
    this.showAddModal = true;
  }

  abrirModalEdit(l: Livro) {
    this.editandoLivro = { ...l };
    this.livro = { ...l };
    this.showEditModal = true;
  }

  fecharModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.livro = this.novoLivro();
    this.editandoLivro = null;
  }

  salvarLivro() {
    const body = {
      ...this.livro
    };

    if (this.editandoLivro) {
      this.api.put('livro', this.editandoLivro.codL, body).subscribe({
        next: () => {
          this.toast.showSuccess('Livro atualizado com sucesso!');
          this.carregarLivros();
          this.fecharModal();
        },
        error: () => this.toast.showError('Erro ao atualizar livro.')
      });
    } else {
      this.api.post('livro', body).subscribe({
        next: () => {
          this.toast.showSuccess('Livro adicionado com sucesso!');
          this.carregarLivros();
          this.fecharModal();
        },
        error: () => this.toast.showError('Erro ao adicionar livro.')
      });
    }
  }

  excluirLivro(id: number) {
    this.api.delete('livro', id).subscribe({
      next: () => {
        this.toast.showSuccess('Livro excluído!');
        this.carregarLivros();
      },
      error: () => this.toast.showError('Erro ao excluir livro.')
    });
  }
}
