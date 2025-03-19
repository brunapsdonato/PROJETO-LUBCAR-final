import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/compat/firestore';
import {from, map, Observable, switchMap} from 'rxjs';
import {Insumos} from '../interfaces/insumos';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  private injetor = inject(Injector);
  private colecaoInsumos: AngularFirestoreCollection<Insumos>;
  Nome_colecao = 'insumos';

  constructor(private firestore: AngularFirestore) {
    this.colecaoInsumos = this.firestore.collection(this.Nome_colecao);
    runInInjectionContext(this.injetor, () => {
      this.colecaoInsumos = this.firestore.collection(this.Nome_colecao);
    })
  }

  listar(): Observable<Insumos[]> {
    return runInInjectionContext(this.injetor, () => {
      return this.colecaoInsumos.valueChanges({idField: 'firebaseId'});
    });
  }

  addInsumo(insumo: Insumos): Observable<Insumos> {
    delete insumo.firebaseId;
    return from(this.colecaoInsumos.add({...insumo})).pipe(
      switchMap((docRef: DocumentReference<Insumos>) => docRef.get()),
      map(doc => ({id: doc.id, ...doc.data()} as Insumos))
    );
  }

  updateInsumo(insumoId: string | undefined, insumo: Insumos): Observable<void> {
    return runInInjectionContext(this.injetor, () => {
      return from(this.colecaoInsumos.doc(insumoId).update({...insumo}));
    });
  }

  deleteInsumo(insumoId: string): Observable<any> {
    return runInInjectionContext(this.injetor, () => {
      return from(this.colecaoInsumos.doc(insumoId).delete());
    });
  }

}

