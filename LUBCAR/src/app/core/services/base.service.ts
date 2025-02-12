import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  protected SetHeaderJson(){
    let token = localStorage.getItem("token");
    let header = {
      "Authorization": "",
      "Content-Type": "application/json",
    };
    if(token){
      header.Authorization =`UDSLongToken ${token}`;
    }
    console.log('Headers:', header);
    return{
      headers: new HttpHeaders(header)
    };
  }

  protected handleError(response: Response | any) {
    let customError: string[] = [];
    console.error('Erro recebido:', response);
    if (response instanceof HttpErrorResponse){
      if (response.statusText === "Unknown Error"){
        customError.push("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
        response.error.errors = customError;
      }
    }
    return throwError(response);
  }

}
