import { Component, OnInit } from '@angular/core';
import { LivroCreate, LivroRead, mapLivroReadToCreate } from 'src/app/shared/models/livro.model';
import { Autor } from 'src/app/shared/models/autor.model';
import { Assunto } from 'src/app/shared/models/assunto.model';
import { ApiService } from 'src/app/shared/api.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html'
})
export class LivrosComponent implements OnInit {
  livrosList: LivroRead[] = [];
  autores: Autor[] = [];
  assuntos: Assunto[] = [];

  showAddModal = false;
  showEditModal = false;

  livro: LivroCreate = this.novoLivro();
  editandoLivroId: number | null = null;

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  novoLivro(): LivroCreate {
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
    this.api.get<LivroRead[]>('livro').subscribe(res => this.livrosList = res);
  }

  carregarAutores() {
    this.api.get<Autor[]>('autor').subscribe(res => this.autores = res);
  }

  carregarAssuntos() {
    this.api.get<Assunto[]>('assunto').subscribe(res => this.assuntos = res);
  }

  abrirModalAdd() {
    this.carregarAutores();
    this.carregarAssuntos();
    this.livro = this.novoLivro();
    this.showAddModal = true;
  }

  abrirModalEdit(livro: LivroRead) {
  this.carregarAutores();
  this.carregarAssuntos();
  this.editandoLivroId = livro.codL;
  const dto = mapLivroReadToCreate(livro);
  this.livro = { ...dto };
  this.showEditModal = true;
}

  fecharModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.livro = this.novoLivro();
    this.editandoLivroId = null;
  }

  salvarLivro() {
    const body = {
      ...this.livro
    };

    if (this.editandoLivroId) {
      this.api.put('livro', this.editandoLivroId, body).subscribe({
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

  excluirLivro(l: LivroRead) {
    this.api.delete('livro', l.codL).subscribe({
      next: () => {
        this.toast.showSuccess('Livro excluído!');
        this.carregarLivros();
      },
      error: () => this.toast.showError('Erro ao excluir livro.')
    });
  }

  onToggleAutor(codAu: number) {
  if (this.livro.autoresIds.includes(codAu)) {
    this.livro.autoresIds = this.livro.autoresIds.filter(id => id !== codAu);
  } else {
    this.livro.autoresIds.push(codAu);
  }
}

onToggleAssunto(codAs: number) {
  if (this.livro.assuntosIds.includes(codAs)) {
    this.livro.assuntosIds = this.livro.assuntosIds.filter(id => id !== codAs);
  } else {
    this.livro.assuntosIds.push(codAs);
  }
}
}
