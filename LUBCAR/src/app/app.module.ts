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
import { CommonModule } from '@angular/common';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { ModalViewClienteComponent } from './components/pages/crud-cliente/modal-view-cliente/modal-view-cliente.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalFormClienteComponent } from './components/pages/crud-cliente/modal-form-cliente/modal-form-cliente.component';
import {MatSelectModule} from '@angular/material/select';

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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatPaginator,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}},
    provideAnimationsAsync()
  ],
})
export class AppModule { }
