import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/pages/login/login.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ClienteComponent} from './components/pages/cliente/cliente.component';
import {CrudClienteComponent} from './components/pages/crud-cliente/crud-cliente.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'cliente', component: ClienteComponent},
  {path: 'crud-cliente', component: CrudClienteComponent},
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
