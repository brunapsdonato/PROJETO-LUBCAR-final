import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/pages/login/login.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ClienteComponent} from './components/pages/cliente/cliente.component';
import {CrudClienteComponent} from './components/pages/crud-cliente/crud-cliente.component';
import {CrudFuncionarioComponent} from './components/pages/crud-funcionario/crud-funcionario.component';
import {CrudInsumosComponent} from './components/pages/crud-insumos/crud-insumos.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'crud-cliente', component: CrudClienteComponent},
  {path: 'crud-funcionario', component: CrudFuncionarioComponent},
  {path: 'crud-insumos', component: CrudInsumosComponent},
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
