
import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/compat/firestore';
import {from, map, Observable, switchMap, throwError} from 'rxjs';
import firebase from 'firebase/compat/app';
import {HttpClient} from '@angular/common/http';
import {Servico} from '../interfaces/servico';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ServicosService {


  private injetor = inject(Injector);

  constructor(private httpClient: HttpClient) {

  }

 listar(clienteId:string): Observable<Servico[]> {
    return this.httpClient.get<Servico[]>('http://localhost:8080/servicos/cliente/'+clienteId);
  }

  addServicos(cliente: Servico): Observable<Servico> {
    return this.httpClient.post<Servico>('http://localhost:8080/servicos', cliente);
  }

  updateServicos(servicoId: string | undefined, servico: Servico): Observable<void> {
    return this.httpClient.put<void>('http://localhost:8080/servicos/'+servicoId, servico);
  }

  deleteServicos(servicoId: string): Observable<any> {
    return this.httpClient.delete<void>('http://localhost:8080/servicos/'+servicoId);
  }
}
