import { Cuestionario } from './../models/cuestionario';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RespuestaCuestionarioService {

  nombreParticipante: string;
  idCuestionario: any;
  respuestas: number[] = [];
  cuestionario: any;

  constructor() {
    this.nombreParticipante = "";
    this.idCuestionario = null;
  }
}
