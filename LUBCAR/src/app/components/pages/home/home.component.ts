import { Component } from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private rota: Router) {
  }

  userName: string | null;
  ngOnInit(){
    this.userName = sessionStorage.getItem('user')
  }

  protected readonly provideHttpClientTesting = provideHttpClientTesting;
}
