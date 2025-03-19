import {inject, Injectable, Injector, runInInjectionContext} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from '@angular/fire/compat/firestore';
import {Funcionario} from '../interfaces/funcionario';
import {from, map, Observable, switchMap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private injetor = inject(Injector);
  private colecaoFuncionarios: AngularFirestoreCollection<Funcionario>;
  Nome_colecao = 'funcionarios';

  constructor(private firestore: AngularFirestore) {
    this.colecaoFuncionarios = this.firestore.collection(this.Nome_colecao);
    runInInjectionContext(this.injetor, () => {
      this.colecaoFuncionarios = this.firestore.collection(this.Nome_colecao);
    })
  }

  listar(): Observable<Funcionario[]> {
    return runInInjectionContext(this.injetor, () => {
      return this.colecaoFuncionarios.valueChanges({idField: 'firebaseId'});
    });
  }

  addFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    delete funcionario.firebaseId;
    return from(this.colecaoFuncionarios.add({...funcionario})).pipe(
      switchMap((docRef: DocumentReference<Funcionario>) => docRef.get()),
      map(doc => ({id: doc.id, ...doc.data()} as Funcionario))
    );
  }

  updateFuncionario(funcionarioId: string | undefined, funcionario: Funcionario): Observable<void> {
    return runInInjectionContext(this.injetor, () => {
      return from(this.colecaoFuncionarios.doc(funcionarioId).update({...funcionario}));
    });
  }

  deleteFuncionario(funcionarioId: string): Observable<any> {
    return runInInjectionContext(this.injetor, () => {
      return from(this.colecaoFuncionarios.doc(funcionarioId).delete());
    });
  }

}

