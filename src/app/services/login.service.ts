import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  myAppUrl: string;
  myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/Login';
   }

   login(usuario: Usuario): Observable<any>{
     return this.http.post(this.myAppUrl + this.myApiUrl, usuario);
   }

   setLocalStorage(data: any): void{
      localStorage.setItem('nombreUsuario', data );
   }

   getNombreUsuario(): string | null{
     return localStorage.getItem('nombreUsuario');
   }

   removeLocalStorage(): void{
     localStorage.removeItem('nombreUsuario');
   }
}
