import { Injectable } from '@angular/core';
import {ApiService} from '../../core/services/api.service';
import {Observable} from 'rxjs';
import {enviroment} from '../../../enviroments/enviroments';
import {ClienteModule} from '../cliente/cliente.module';
import {ClienteComponent} from '../../components/pages/cliente/cliente.component';


export class Cliente {
  id: string | null;
  nome: string;
  carroModelo: string;
  ano: string;
  data: string;
  servico: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private apiService: ApiService) { }
  private classController: string = 'clientes';
  listarTodos(): Observable<Cliente[]>{
    return this.apiService.get(enviroment.api + this.classController)
  }

  pesquisarPorNome(nome: string): Observable<Cliente[]>{
    const url = `${enviroment.api + this.classController}?nome_like=${nome}`;
    return this.apiService.get(url);
  }
  inserir(objeto: Cliente) : Observable<Cliente>{
    console.log('Chamando inserir API:', enviroment.api + this.classController, objeto);
    return this.apiService.post(enviroment.api + this.classController, objeto);
  }

  editar(objeto: Cliente) : Observable<Cliente> {
    console.log('Chamando editar API:', enviroment.api + this.classController + '/' + objeto.id, objeto);
    return this.apiService.put(enviroment.api + this.classController + '/' + objeto.id, objeto);
  }

  delete(id: string) : Observable<any> {
    console.log('Chamando delete API:', enviroment.api + this.classController + '/' + id);
    return this.apiService.delete(enviroment.api + this.classController + '/' + id);
  }
}
