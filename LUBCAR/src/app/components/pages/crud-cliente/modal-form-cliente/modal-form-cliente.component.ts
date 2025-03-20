import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientesService} from '../../../../services/clientes.service';
import {Cliente} from '../../../../interfaces/cliente';
import { dataMinimaValidator } from '../../../../../app/data-minima.validator';


@Component({
  selector: 'app-modal-form-cliente',
  standalone: false,
  templateUrl: './modal-form-cliente.component.html',
  styleUrl: './modal-form-cliente.component.scss'
})
export class ModalFormClienteComponent implements OnInit{

 listaServico = [
   {
      id: 1,
     descricao: 'Troca de óleo'
   },
   {
     id: 2,
     descricao: 'Troca de filtro'
   },
   {
     id: 3,
     descricao: 'Troca de filtro + troca de óleo'
   }
 ]

  formCliente: FormGroup;
  editUser: boolean = false;


  constructor(
    public diaLogRef: MatDialogRef<ModalFormClienteComponent>,
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

    ngOnInit(){
      this.builForm();
      if(this.data && this.data.nome){
        this.editUser = true;
      }
    }

    saveCliente() {
      const objClienteForm: Cliente = this.formCliente.getRawValue();
      if (this.data?.firebaseId) {
        console.log('Firebase ID:', this.data?.firebaseId);
        this.clienteService.updateCliente(this.data.id, objClienteForm).subscribe({
          next: () => console.log('Cliente atualizado com sucesso!'),
          error: (err: any) => console.error('Erro ao atualizar cliente:', err),
        });
        this.closeModal();
      }else {
        this.clienteService.addCliente(objClienteForm).subscribe({
          next: (response) => {
            console.log('Cliente adicionado com sucesso:', response);
            this.closeModal();
          },
          error: (err) => {
            console.error('Erro ao adicionar cliente:', err);
          }
        });
      }

    }
    builForm(){
    this.formCliente = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      cpf: [null, [Validators.required, Validators.minLength(11)]],
      email: [null, [Validators.required, Validators.email]],
      carroModelo: [null, [Validators.required, Validators.minLength(2)]],
      ano: [null, [Validators.required, Validators.minLength(4)]],
      data: new FormControl('', [dataMinimaValidator()]),
      servico: [null, [Validators.required, Validators.minLength(5)]],
      valor: [null, [Validators.required, Validators.minLength(3)]],
    });

    if(this.data && this.data.nome){
      this.fillForm();
    }
  }

  fillForm(){
    this.formCliente.patchValue({
      nome: this.data.nome,
      cpf: this.data.cpf,
      email: this.data.email,
      carroModelo: this.data.carroModelo,
      ano: this.data.ano,
      data: this.data.data,
      servico: this.data.servico,
      valor: this.data.valor
    })
  }

  closeModal(){this.diaLogRef.close(); }
}
