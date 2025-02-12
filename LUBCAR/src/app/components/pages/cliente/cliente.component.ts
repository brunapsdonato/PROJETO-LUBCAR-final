import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ClienteModule} from '../../../modulo/cliente/cliente.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClienteService, Cliente} from '../../../modulo/service/cliente.service';


@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})

export class ClienteComponent implements OnInit {

  exibirPesquisa: boolean = true;
  constructor(private fb: FormBuilder, private rota: Router, private clienteService: ClienteService,
  private activatedRoute: ActivatedRoute) {
  }

  clienteName: string;
  dataSource: Cliente[] = [];
  displayedColumns: string[] = [
    'actions',
    'nome',
    'carroModelo',
    'ano',
    'data',
    'servico'
]

  typeAdd: boolean = false;

  form!: FormGroup;

  searchForm!: FormGroup;

  ngOnInit() {

    this.form = this.fb.group({
      id: [null],
      nome: [null, Validators.required],
      carroModelo: [null, Validators.required],
      ano: [null, Validators.required],
      data: [null, Validators.required],
      servico: [null, Validators.required]
      }
    )

    this.searchForm = this.fb.group({
      searchNome: [null]
    });

    this.listarClientes();

    this.activatedRoute.url.subscribe(url => {
      this.exibirPesquisa = this.rota.url.includes('listar-clientes');
    });

  }

  editar(cliente: Cliente){
    this.form.patchValue(cliente);
    this.typeAdd = true;
    this.exibirPesquisa = false;
  }

  remover(id: string){
    console.log('Removendo cliente com ID:', id);
    this.clienteService.delete(id).subscribe(
      retorno => {
        if (retorno) {
          this.listarClientes();
        }
      },
      error => {
        console.error('Erro ao remover cliente:', error);
      }
    );
  }
  salvar() {
    if (this.form.valid) {
      let dados: any = this.form.value as Cliente;

      if (!dados.id) {
        dados.id = this.gerarIdUnico(); // Gera um ID único
        this.inserir(dados);
      } else {
        this.atualizar(dados);
      }
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }

  gerarIdUnico(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }


  inserir(objeto: Cliente){
    this.clienteService.inserir(objeto).subscribe(retorno =>{
      this.listarClientes();
      this.typeAdd = false;
      this.exibirPesquisa = true;
    })
  }

  atualizar(objeto: Cliente){
    this.clienteService.editar(objeto).subscribe(retorno =>{
      this.listarClientes();
      this.typeAdd = false;
      this.exibirPesquisa = true;
    })
  }
  listarClientes() {
    this.clienteService.listarTodos().subscribe(retorno => {
        this.dataSource = retorno;
      },
      error => {
        console.error('Erro ao listar clientes:', error);
      });
  }
  addCliente(){
    this.typeAdd = true;
    this.exibirPesquisa = false;
  }

  search(){
    this.typeAdd = false;
    this.exibirPesquisa = true;
  }
  cliente() {
    sessionStorage.setItem('user', this.clienteName);
    this.rota.navigate(['home']);
  }

  pesquisarClientePorNome() {
    const nome = this.searchForm.get('searchNome')?.value;
    if (nome) {
      this.clienteService.pesquisarPorNome(nome).subscribe(
        retorno => {
          this.dataSource = retorno;
        },
        error => {
          console.error('Erro ao pesquisar cliente:', error);
        }
      );
    }
  }
}


