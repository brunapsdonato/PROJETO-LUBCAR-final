import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Insumos} from '../../../../interfaces/insumos';

@Component({
  selector: 'app-modal-view-insumo',
  standalone: false,
  templateUrl: './modal-view-insumo.component.html',
  styleUrl: './modal-view-insumo.component.scss'
})
export class ModalViewInsumoComponent {

  userData: Insumos;
  constructor(public dialogRef: MatDialogRef<ModalViewInsumoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userData = data;
  }
  closeModal(){ this.dialogRef.close();}
}
