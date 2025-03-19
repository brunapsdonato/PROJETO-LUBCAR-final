import {Component, OnInit, ViewChild} from '@angular/core';
import {Funcionario} from '../../../interfaces/funcionario';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {FuncionariosService} from '../../../services/funcionarios.service';
import {ModalViewFuncionarioComponent} from './modal-view-funcionario/modal-view-funcionario.component';
import {ModalFormFuncionarioComponent} from './modal-form-funcionario/modal-form-funcionario.component';

@Component({
  selector: 'app-crud-funcionario',
  standalone: false,
  templateUrl: './crud-funcionario.component.html',
  styleUrl: './crud-funcionario.component.scss'
})
export class CrudFuncionarioComponent implements OnInit{
  displayedColumns: string[] = ['nome', 'cpf', 'email', 'dataNasc', 'endereco', 'action'];
  dataSource: any;
  listaFuncionarios: Funcionario[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private funcionariosService: FuncionariosService, public dialog: MatDialog, ) {
    this.dataSource = new MatTableDataSource<any>(this.listaFuncionarios);
  }
  ngOnInit() {
    this.getListFuncionarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListFuncionarios() {
    this.funcionariosService.listar().subscribe({
      next: (response: any) => {
        console.log('Lista de Funcionários Firebase', response);
        this.listaFuncionarios = response;
        this.dataSource = new MatTableDataSource<any>(this.listaFuncionarios);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel="Itens por página";
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteFuncionario(firebaseId: string) {
    this.funcionariosService.deleteFuncionario(firebaseId).subscribe({
      next: () => {
        console.log('Funcionario deletado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao deletar funcionario:', err);
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

  openModalViewFuncionario(funcionario: Funcionario){
    this.dialog.open(ModalViewFuncionarioComponent,{
      width: '700px',
      height: '330px',
      data: funcionario
    })
  }

  openModalAddFuncionario(){
    this.dialog.open(ModalFormFuncionarioComponent,{
      width: '700px',
      height: '400px'
    }).afterClosed().subscribe(() => this.getListFuncionarios());
  }

  openModalEditFuncionario(funcionario: Funcionario){
    this.dialog.open(ModalFormFuncionarioComponent,{
      width: '700px',
      height: '400px',
      data: funcionario
    }).afterClosed().subscribe(() => this.getListFuncionarios());
  }

}
