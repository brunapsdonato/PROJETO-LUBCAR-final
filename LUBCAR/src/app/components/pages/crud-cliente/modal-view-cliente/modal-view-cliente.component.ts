import {Component, Inject} from '@angular/core';
import {Cliente} from '../../../../interfaces/cliente';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientesService} from '../../../../services/clientes.service';
import {ServicosService} from '../../../../services/servicos.service';
import { Servico } from '../../../../interfaces/servico';

@Component({
  selector: 'app-modal-view-cliente',
  standalone: false,
  templateUrl: './modal-view-cliente.component.html',
  styleUrl: './modal-view-cliente.component.scss'
})
export class ModalViewClienteComponent {
  userData: Cliente;
  novoServico: any = {}; // Para armazenar os dados do novo serviço
  servicos: Servico[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalViewClienteComponent>,
    private clienteService: ClientesService,
    private servicosService: ServicosService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userData = data;
    servicosService.listar(this.userData.id as any).subscribe({
      next: (servicos) => {
        this.servicos = servicos;
      }
    });

  }


  closeModal() {
    this.dialogRef.close();

  }

  // Método para salvar um novo serviço
  salvarNovoServico(): void {
    this.novoServico.cliente = this.userData;
    this.servicosService.addServicos(this.novoServico).subscribe({
      next: () => {
        console.log('Novo serviço salvo com sucesso!');
        this.servicosService.listar(this.userData.id as any).subscribe({
          next: (servicos) => {
            this.servicos = servicos;
          }
        });
      }
    });
  }

}
