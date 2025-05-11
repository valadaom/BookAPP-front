import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-modal-preco',
  templateUrl: './modal-preco.component.html',
  styleUrls: ['./modal-preco.component.scss']
})
export class ModalPrecoComponent implements OnInit {
  @Input() show = false;
  @Input() livro: any = null;

  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

  formasCompra: any[] = [];
  precos: { [formaId: number]: number } = {};

  constructor(private api: ApiService, private toast: ToastService) {}

  ngOnInit(): void {
    this.api.get<any[]>('formacompra').subscribe(data => {
      this.formasCompra = data;
      this.carregarPrecos();
    });
  }

  carregarPrecos() {
    if (!this.livro) return;

    this.api.get<any[]>(`livroformacompra/${this.livro.codL}`).subscribe(data => {
      for (let preco of data) {
        this.precos[preco.codFC] = preco.preco;
      }
    });
  }

  onSave() {
  const dto = {
    livroCodL: this.livro.codL,
    precos: this.formasCompra.map(fc => ({
      formaCompraCodFC: fc.codFC,
      preco: this.precos[fc.codFC] ?? 0
    }))
  };

  this.api.put('livroformacompra/atualizar-precos', dto, undefined).subscribe({
    next: () => {
      this.toast.showSuccess('Preços atualizados com sucesso!');
      this.save.emit();
      this.close.emit();
    },
    error: () => {
      this.toast.showError('Erro ao atualizar os preços.');
    }
  });
}
}
