import { CuestionarioService } from './../../../../../services/cuestionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit {

  tituloCuestionario:string;
  descripcionCuestionario: string;

  constructor(private _cuestionarioService: CuestionarioService) {
    this.tituloCuestionario="";
    this.descripcionCuestionario="";
   }

  ngOnInit(): void {
    this.tituloCuestionario = this._cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this._cuestionarioService.descripcionCuestionario;
  }

}
