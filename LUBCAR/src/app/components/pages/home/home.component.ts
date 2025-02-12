import { Component } from '@angular/core';
import {provideHttpClientTesting} from '@angular/common/http/testing';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  userName: string | null;
  ngOnInit(){
    this.userName = sessionStorage.getItem('user')
  }

  protected readonly provideHttpClientTesting = provideHttpClientTesting;
}
