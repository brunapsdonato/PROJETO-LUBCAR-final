import { Component, OnInit } from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Router} from '@angular/router';
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  totalClientes: number = 0;
  totalClientesSemana: number = 0;
  constructor(private rota: Router,
  private clientesService: ClientesService) {
  }

  userName: string | null;
  ngOnInit(){
    this.userName = sessionStorage.getItem('user')
    this.carregarTotalClientes();
    this.carregarTotalClientesSemana();
  }

  carregarTotalClientes(): void {
    this.clientesService.getTotalClientes().subscribe({
      next: (total) => {
        this.totalClientes = total; // Atualiza o valor total de clientes
      },
      error: (err) => {
        console.error('Erro ao buscar total de clientes:', err);
      }
    });
  }
  carregarTotalClientesSemana(): void {
    this.clientesService.getClientesUltimaSemana().subscribe({
      next: (total) => {
        this.totalClientesSemana = total;
        console.log('Total de clientes na última semana:', total);
      },
      error: (err) => {
        console.error('Erro ao buscar clientes da última semana:', err);
      }
    });
  }

  protected readonly provideHttpClientTesting = provideHttpClientTesting;
}
