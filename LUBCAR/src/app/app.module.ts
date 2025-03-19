import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './components/pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './components/pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import {RouterModule} from '@angular/router';
import { ClienteComponent } from './components/pages/cliente/cliente.component';
import { CrudClienteComponent } from './components/pages/crud-cliente/crud-cliente.component';

//Angular Material
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire/compat';
import {environment} from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {CommonModule, DatePipe} from '@angular/common';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ModalViewClienteComponent } from './components/pages/crud-cliente/modal-view-cliente/modal-view-cliente.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalFormClienteComponent } from './components/pages/crud-cliente/modal-form-cliente/modal-form-cliente.component';
import {MatSelectModule} from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {APP_DATE_FORMATS} from './app-date-formats';
import {AppDateAdapter} from './app-date-adapter';
import {CrudFuncionarioComponent} from './components/pages/crud-funcionario/crud-funcionario.component';
import { ModalViewFuncionarioComponent } from './components/pages/crud-funcionario/modal-view-funcionario/modal-view-funcionario.component';
import { ModalFormFuncionarioComponent } from './components/pages/crud-funcionario/modal-form-funcionario/modal-form-funcionario.component';
import { CrudInsumosComponent } from './components/pages/crud-insumos/crud-insumos.component';
import { ModalFormInsumoComponent } from './components/pages/crud-insumos/modal-form-insumo/modal-form-insumo.component';
import { ModalViewInsumoComponent } from './components/pages/crud-insumos/modal-view-insumo/modal-view-insumo.component';



@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ClienteComponent,
    CrudClienteComponent,
    ModalViewClienteComponent,
    ModalFormClienteComponent,
    CrudFuncionarioComponent,
    ModalViewFuncionarioComponent,
    ModalFormFuncionarioComponent,
    CrudInsumosComponent,
    ModalFormInsumoComponent,
    ModalViewInsumoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MatDialogModule,
    MatPaginator,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    [DatePipe],
    provideAnimationsAsync()
  ],
})
export class AppModule { }
