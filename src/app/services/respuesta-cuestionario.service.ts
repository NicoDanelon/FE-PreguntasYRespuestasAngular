import { Observable } from 'rxjs';
import { RespuestaCuestionario } from './../models/respuestaCuestionario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  myAppUrl: string;
  myApiUrl: string;
  nombreParticipante: string;
  idCuestionario: any;
  respuestas: number[] = [];
  cuestionario: any;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = '/api/RespuestaCuestionario/';
    this.nombreParticipante = "";
    this.idCuestionario = null;
  }

  guardarRespuestaCuestionario(respuestaCuestionario: RespuestaCuestionario): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, respuestaCuestionario );
  }

  getListCuestionarioRespuesta(idCuestionario: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + idCuestionario);
  }

  eliminarRespuestaCuestionario(idRespuestaCuestionario: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + idRespuestaCuestionario);
  }

  getCuestionarioByIdRespuesta(idRespuesta: number): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl + 'GetCuestionarioByIdRespuesta/' + idRespuesta);
  }

  setLocalStorage(nombre: any): void{
    localStorage.setItem('nombreParticipante', nombre );
 }

 removeLocalStorage(): void{
  localStorage.removeItem('nombreParticipante');
 }

}
