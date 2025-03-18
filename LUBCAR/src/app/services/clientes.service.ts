import {EnvironmentInjector, Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {map, Observable} from 'rxjs';
import {Cliente} from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private dataBaseStore: AngularFirestore, private injector: EnvironmentInjector) { }

  getAllClientes(): Observable<any[]> {
    return new Observable((observer) => {
      this.injector.runInInjectionContext(() => {
        this.dataBaseStore
          .collection('clientes', (ref) => ref.orderBy('nome'))
          .valueChanges({ idField: 'firebaseId' })
          .subscribe({
            next: (data) => observer.next(data),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
          });
      });
    });
  }
  addCliente(cliente: Cliente) {
    return this.dataBaseStore.collection('clientes').add(cliente);
  }

  updateCliebte(clienteId: string, cliente: Cliente){
    return this.dataBaseStore.collection('clientes').doc(clienteId).update(cliente);
  }

  deleteCliente(clienteId: string){
    return this.dataBaseStore.collection('clientes').doc(clienteId).delete();
  }

}
