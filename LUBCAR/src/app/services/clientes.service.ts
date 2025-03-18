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

  deleteCliente(clienteId: string){
    return this.firestore.collection('clientes').doc(clienteId).delete();
  }

}
