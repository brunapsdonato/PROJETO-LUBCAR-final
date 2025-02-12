import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ]
})

export class ClienteModule {
  id?: string;
  nome: string;
  carroModelo: string;
  ano: number;
  data: string;
  servico: string;

}
