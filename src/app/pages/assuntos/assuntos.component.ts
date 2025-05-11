import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Assunto } from 'src/app/shared/models/assunto.model';

@Component({
  selector: 'app-assuntos',
  templateUrl: './assuntos.component.html'
})
export class AssuntosComponent implements OnInit {
  assuntos: Assunto[] = [];

  showAddModal = false;
  showEditModal = false;

  descricao = '';
  assuntoEditando: Assunto | null = null;

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit(): void {
    this.carregarAssuntos();
  }

  carregarAssuntos() {
    this.api.get<Assunto[]>('assunto').subscribe(data => this.assuntos = data);
  }

  abrirModalAdd() {
    this.descricao = '';
    this.showAddModal = true;
  }

  abrirModalEdit(assunto: Assunto) {
    this.assuntoEditando = assunto;
    this.descricao = assunto.descricao;
    this.showEditModal = true;
  }

  fecharModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.descricao = '';
    this.assuntoEditando = null;
  }

  salvarAssunto(descricao: string) {
    if (!descricao.trim()) return;

    const payload = { descricao };

    if (this.assuntoEditando) {
      this.api.put('assunto',  {
        codAs: this.assuntoEditando.codAs,
        descricao
      },
      this.assuntoEditando.codAs,).subscribe({
        next: () => {
          this.toast.showSuccess('Assunto atualizado com sucesso!');
          this.fecharModal();
          this.carregarAssuntos();
        },
        error: () => this.toast.showError('Erro ao atualizar assunto.')
      });
    } else {
      this.api.post('assunto', payload).subscribe({
        next: () => {
          this.toast.showSuccess('Assunto adicionado com sucesso!');
          this.fecharModal();
          this.carregarAssuntos();
        },
        error: () => this.toast.showError('Erro ao adicionar assunto.')
      });
    }
  }

  excluirAssunto(id: number) {
    this.api.delete('assunto', id).subscribe({
      next: () => {
        this.toast.showSuccess('Assunto excluído!');
        this.carregarAssuntos();
      },
      error: () => this.toast.showError('Erro ao excluir assunto.')
    });
  }
}
