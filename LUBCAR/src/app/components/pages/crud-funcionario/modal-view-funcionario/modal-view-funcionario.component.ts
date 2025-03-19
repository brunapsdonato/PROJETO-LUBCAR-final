import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Funcionario} from '../../../../interfaces/funcionario';

@Component({
  selector: 'app-modal-view-funcionario',
  standalone: false,
  templateUrl: './modal-view-funcionario.component.html',
  styleUrl: './modal-view-funcionario.component.scss'
})
export class ModalViewFuncionarioComponent {
  userData: Funcionario;

  constructor(public dialogRef: MatDialogRef<ModalViewFuncionarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userData = data;
  }
  closeModal(){ this.dialogRef.close();}
}
