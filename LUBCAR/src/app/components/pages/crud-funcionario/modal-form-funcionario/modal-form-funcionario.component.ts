import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Cliente} from '../../../../interfaces/cliente';
import {dataMinimaValidator} from '../../../../data-minima.validator';
import {FuncionariosService} from '../../../../services/funcionarios.service';
import {Funcionario} from '../../../../interfaces/funcionario';

@Component({
  selector: 'app-modal-form-funcionario',
  standalone: false,
  templateUrl: './modal-form-funcionario.component.html',
  styleUrl: './modal-form-funcionario.component.scss'
})
export class ModalFormFuncionarioComponent implements OnInit {

  formFuncionario: FormGroup;
  editUser: boolean = false;
  constructor(
    public diaLogRef: MatDialogRef<ModalFormFuncionarioComponent>,
    private formBuilder: FormBuilder,
    private funcionarioService:FuncionariosService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(){
    this.builForm();
    if(this.data && this.data.nome){
      this.editUser = true;
    }
  }

  saveFuncionario() {
    const objFuncionarioForm: Funcionario = this.formFuncionario.getRawValue();
    if (this.data?.firebaseId) {
      console.log('Firebase ID:', this.data?.firebaseId);
      this.funcionarioService.updateFuncionario(this.data.firebaseId, objFuncionarioForm).subscribe({
        next: () => console.log('Funcionário atualizado com sucesso!'),
        error: (err: any) => console.error('Erro ao atualizar funcionário:', err),
      });
      this.closeModal();
    }else {
      this.funcionarioService.addFuncionario(objFuncionarioForm).subscribe({
        next: (response) => {
          console.log('Funcionário adicionado com sucesso:', response);
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao adicionar funcionário:', err);
        }
      });
    }

  }
  builForm(){
    this.formFuncionario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      cpf: [null, [Validators.required, Validators.minLength(11)]],
      email: [null, [Validators.required, Validators.email]],
      dataNas: [null, [Validators.required]],
      endereco: [null, [Validators.required, Validators.minLength(5)]],
    });

    if(this.data && this.data.nome){
      this.fillForm();
    }
  }

  fillForm(){
    this.formFuncionario.patchValue({
      nome: this.data.nome,
      cpf: this.data.cpf,
      email: this.data.email,
      dataNasc: this.data.dataNasc,
      endereco: this.data.endereco
    })
  }

  closeModal(){this.diaLogRef.close(); }
}

