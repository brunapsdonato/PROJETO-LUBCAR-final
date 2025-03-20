import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/compat/firestore';
import {from, map, Observable, switchMap, throwError} from 'rxjs';
import {Cliente} from '../interfaces/cliente';
import firebase from 'firebase/compat/app';
import {HttpClient} from '@angular/common/http';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  private injetor = inject(Injector);
  private colecaoClientes: AngularFirestoreCollection<Cliente>;
  Nome_colecao = 'clientes';

  constructor(private firestore: AngularFirestore, private httpClient: HttpClient) {
    this.colecaoClientes = this.firestore.collection(this.Nome_colecao);
    runInInjectionContext(this.injetor, () => {
      this.colecaoClientes = this.firestore.collection(this.Nome_colecao);
    });
  }

 listar(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>('http://localhost:8080/clientes');
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>('http://localhost:8080/clientes', cliente);
  }

  updateCliente(clienteId: string | undefined, cliente: Cliente): Observable<void> {
    return this.httpClient.put<void>('http://localhost:8080/clientes/'+clienteId, cliente);
  }

  deleteCliente(clienteId: string): Observable<any> {
    return this.httpClient.delete<void>('http://localhost:8080/clientes/'+clienteId);
  }

  getTotalClientes(): Observable<number> {
    return this.listar().pipe(
      map(clientes => clientes.length));
  }

  getClientesUltimaSemana(): Observable<number> {
    const hoje = new Date();
    const umaSemanaAtras = new Date(hoje);
    umaSemanaAtras.setDate(hoje.getDate() - 7);

    return from(
      this.colecaoClientes.ref.where('dataCadastro', '>=', umaSemanaAtras).get()
    ).pipe(
      map(snapshot => snapshot.size)
    );
  }

  atualizarHistorico(clienteId: string, novoServico: any): Observable<void> {
    return runInInjectionContext(this.injetor, () => {
      const updateData = {
        historico: firebase.firestore.FieldValue.arrayUnion(novoServico)
      } as any;
      return from(
        this.colecaoClientes.doc(clienteId).update(updateData)
      );
    });
  }
}
