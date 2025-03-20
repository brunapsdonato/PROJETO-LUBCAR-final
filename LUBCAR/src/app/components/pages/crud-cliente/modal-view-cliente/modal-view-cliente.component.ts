import {Component, Inject} from '@angular/core';
import {Cliente} from '../../../../interfaces/cliente';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientesService} from '../../../../services/clientes.service';

@Component({
  selector: 'app-modal-view-cliente',
  standalone: false,
  templateUrl: './modal-view-cliente.component.html',
  styleUrl: './modal-view-cliente.component.scss'
})
export class ModalViewClienteComponent {
  userData: Cliente;
  novoServico: any = {}; // Para armazenar os dados do novo serviço

  constructor(
    public dialogRef: MatDialogRef<ModalViewClienteComponent>,
    private clienteService: ClientesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = data;
  }

  closeModal() {
    this.dialogRef.close();
  }

  // Método para salvar um novo serviço
  salvarNovoServico(): void {
    if (!this.userData.historico) {
      this.userData.historico = [];
    }
    (this.userData.historico as any[]).push(this.novoServico);
    this.novoServico = {};
  }

}
