import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientesService} from '../../../services/clientes.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Cliente} from '../../../interfaces/cliente';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {ModalViewClienteComponent} from './modal-view-cliente/modal-view-cliente.component';
import {ModalFormClienteComponent} from './modal-form-cliente/modal-form-cliente.component';



@Component({
  selector: 'app-crud-cliente',
  standalone: false,
  templateUrl: './crud-cliente.component.html',
  styleUrl: './crud-cliente.component.scss'
})
export class CrudClienteComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'cpf', 'email', 'carroModelo', 'ano', 'data', 'servico', 'valor','action'];
  dataSource: any;
  listaClientes: Cliente[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clientesService: ClientesService, public dialog: MatDialog, ) {
    this.dataSource = new MatTableDataSource<any>(this.listaClientes);
  }
  ngOnInit() {
    this.getListClientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListClientes() {
    this.clientesService.listar().subscribe({
      next: (response: any) => {
        console.log('Lista de Clientes Firebase', response);
        this.listaClientes = response;
        this.dataSource = new MatTableDataSource<any>(this.listaClientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel="Itens por página";
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteCliente(firebaseId: string) {
    this.clientesService.deleteCliente(firebaseId).subscribe({
      next: () => {
        console.log('Cliente deletado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao deletar cliente:', err);
      }
    });
  }

    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModalViewCliente(cliente: Cliente){
    this.dialog.open(ModalViewClienteComponent,{
      width: '700px',
      height: '330px',
      data: cliente
    })
  }

  openModalAddCliente(){
    this.dialog.open(ModalFormClienteComponent,{
      width: '700px',
      height: '400px'
    }).afterClosed().subscribe(() => this.getListClientes());
  }

  openModalEditCliente(cliente: Cliente){
    this.dialog.open(ModalFormClienteComponent,{
      width: '700px',
      height: '400px',
      data: cliente
    }).afterClosed().subscribe(() => this.getListClientes());
  }

}
