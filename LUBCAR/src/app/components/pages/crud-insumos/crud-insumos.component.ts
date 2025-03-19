import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {InsumosService} from '../../../services/insumos.service';
import {Insumos} from '../../../interfaces/insumos';
import {ModalFormInsumoComponent} from './modal-form-insumo/modal-form-insumo.component';
import {ModalViewInsumoComponent} from './modal-view-insumo/modal-view-insumo.component';

@Component({
  selector: 'app-crud-insumos',
  standalone: false,
  templateUrl: './crud-insumos.component.html',
  styleUrl: './crud-insumos.component.scss'
})
export class CrudInsumosComponent implements OnInit {

  displayedColumns: string[] = ['nome', 'quantidade', 'dataValidade', 'action'];
  dataSource: any;
  listaInsumos: Insumos[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private insumosService: InsumosService, public dialog: MatDialog, ) {
    this.dataSource = new MatTableDataSource<any>(this.listaInsumos);
  }
  ngOnInit() {
    this.getListInsumos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListInsumos() {
    this.insumosService.listar().subscribe({
      next: (response: any) => {
        console.log('Lista de Insumos Firebase', response);
        this.listaInsumos = response;
        this.dataSource = new MatTableDataSource<any>(this.listaInsumos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel="Itens por página";
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  deleteInsumo(firebaseId: string) {
    this.insumosService.deleteInsumo(firebaseId).subscribe({
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

  openModalViewInsumo(insumo: Insumos){
    this.dialog.open(ModalViewInsumoComponent,{
      width: '700px',
      height: '330px',
      data: insumo
    })
  }

  openModalAddInsumo(){
    this.dialog.open(ModalFormInsumoComponent,{
      width: '700px',
      height: '400px'
    }).afterClosed().subscribe(() => this.getListInsumos());
  }

  openModalEditInsumo(insumo: Insumos){
    this.dialog.open(ModalFormInsumoComponent,{
      width: '700px',
      height: '400px',
      data: insumo
    }).afterClosed().subscribe(() => this.getListInsumos());
  }

}
