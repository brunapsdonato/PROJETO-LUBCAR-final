import {Component, Inject} from '@angular/core';
import {Cliente} from '../../../../interfaces/cliente';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-view-cliente',
  standalone: false,
  templateUrl: './modal-view-cliente.component.html',
  styleUrl: './modal-view-cliente.component.scss'
})
export class ModalViewClienteComponent {
  userData: Cliente;

  constructor(public dialogRef: MatDialogRef<ModalViewClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userData = data;
  }
  closeModal(){ this.dialogRef.close();}
}
