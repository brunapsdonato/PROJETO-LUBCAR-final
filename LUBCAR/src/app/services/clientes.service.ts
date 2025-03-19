import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/compat/firestore';
import {from, map, Observable, switchMap, throwError} from 'rxjs';
import {Cliente} from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private injetor = inject(Injector);
  private colecaoClientes: AngularFirestoreCollection<Cliente>;
  Nome_colecao = 'clientes';

  constructor(private firestore: AngularFirestore) {
    this.colecaoClientes = this.firestore.collection(this.Nome_colecao);
    runInInjectionContext(this.injetor, () => {
      this.colecaoClientes = this.firestore.collection(this.Nome_colecao);
    })
  }

  listar(): Observable<Cliente[]> {
    return runInInjectionContext(this.injetor, () => {
      return this.colecaoClientes.valueChanges({idField: 'firebaseId'});
    });
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    cliente.data = new Date();
    delete cliente.firebaseId;
    return from(this.colecaoClientes.add({...cliente})).pipe(
      switchMap((docRef: DocumentReference<Cliente>) => docRef.get()),
      map(doc => ({id: doc.id, ...doc.data()} as Cliente))
    );
  }

  updateCliente(clienteId: string | undefined, cliente: Cliente): Observable<void> {
    return runInInjectionContext(this.injetor, () => {
      return from(this.colecaoClientes.doc(clienteId).update({...cliente}));
    });
  }

  deleteCliente(clienteId: string): Observable<any> {
    return runInInjectionContext(this.injetor, () => {
      return from(this.colecaoClientes.doc(clienteId).delete());
    });
  }

  getTotalClientes(): Observable<number> {
    return this.colecaoClientes.snapshotChanges().pipe(
      map(actions => actions.length) // Conta o total de documentos
    );
  }

  getClientesUltimaSemana(): Observable<number> {
    const hoje = new Date();
    const umaSemanaAtras = new Date(hoje);
    umaSemanaAtras.setDate(hoje.getDate() - 7); // Define uma semana atrás

    return from(
      this.colecaoClientes.ref.where('dataCadastro', '>=', umaSemanaAtras).get()
    ).pipe(
      map(snapshot => snapshot.size) // Retorna o número de documentos
    );
  }

}
