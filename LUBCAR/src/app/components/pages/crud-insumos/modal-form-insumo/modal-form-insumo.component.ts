import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {InsumosService} from '../../../../services/insumos.service';
import {Insumos} from '../../../../interfaces/insumos';

@Component({
  selector: 'app-modal-form-insumo',
  standalone: false,
  templateUrl: './modal-form-insumo.component.html',
  styleUrl: './modal-form-insumo.component.scss'
})
export class ModalFormInsumoComponent implements OnInit {

  formInsumo: FormGroup;
  editUser: boolean = false;
  constructor(
    public diaLogRef: MatDialogRef<ModalFormInsumoComponent>,
    private formBuilder: FormBuilder,
    private insumoService:InsumosService,
  @Inject(MAT_DIALOG_DATA) public data: any,
) {}

  ngOnInit(){
    this.builForm();
    if(this.data && this.data.nome){
      this.editUser = true;
    }
  }

  saveInsumo() {
    const objInsumoForm: Insumos = this.formInsumo.getRawValue();
    if (this.data?.firebaseId) {
      console.log('Firebase ID:', this.data?.firebaseId);
      this.insumoService.updateInsumo(this.data.firebaseId, objInsumoForm).subscribe({
        next: () => console.log('Insumo atualizado com sucesso!'),
        error: (err: any) => console.error('Erro ao atualizar insumo:', err),
      });
      this.closeModal();
    }else {
      this.insumoService.addInsumo(objInsumoForm).subscribe({
        next: (response) => {
          console.log('Insumo adicionado com sucesso:', response);
          this.closeModal();
        },
        error: (err) => {
          console.error('Erro ao adicionar insumo:', err);
        }
      });
    }

  }
  builForm(){
    this.formInsumo = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      quantidade: [null, [Validators.required, Validators.minLength(1)]],
      dataValidade: [null, [Validators.required]]
    });

    if(this.data && this.data.nome){
      this.fillForm();
    }
  }

  fillForm(){
    this.formInsumo.patchValue({
      nome: this.data.nome,
      quantidade: this.data.quantidade,
      dataValidade: this.data.dataValidade
    })
  }

  closeModal(){this.diaLogRef.close(); }
}
