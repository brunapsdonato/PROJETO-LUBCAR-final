import {Component, OnInit} from '@angular/core';
import {ClientesService} from '../../../services/clientes.service';

@Component({
  selector: 'app-crud-cliente',
  standalone: false,
  templateUrl: './crud-cliente.component.html',
  styleUrl: './crud-cliente.component.scss'
})
export class CrudClienteComponent implements OnInit {

  dataSource: any;

  constructor(private clientesService: ClientesService) {
  }
  ngOnInit() {
    this.getListClientes();
  }

  getListClientes() {
    this.clientesService.getAllClientes().subscribe({
      next: (clientes) => console.log('Clientes:', clientes),
      error: (err) => console.error('Erro ao buscar clientes:', err)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
