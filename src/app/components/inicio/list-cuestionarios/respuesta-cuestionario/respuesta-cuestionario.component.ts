import { Router } from '@angular/router';
import { RespuestaCuestionarioService } from './../../../../services/respuesta-cuestionario.service';
import { Cuestionario } from './../../../../models/cuestionario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-respuesta-cuestionario',
  templateUrl: './respuesta-cuestionario.component.html',
  styleUrls: ['./respuesta-cuestionario.component.css']
})
export class RespuestaCuestionarioComponent implements OnInit {

  cuestionario: any;
  respuestaUusario: number[] = [];

  constructor(private _RespuestaCuestionarioService: RespuestaCuestionarioService,
              private router: Router){

  }

  ngOnInit(): void {
    if (this._RespuestaCuestionarioService.idCuestionario == null){
      this.router.navigate(['/inicio']);
    }else{
      this.cuestionario = this._RespuestaCuestionarioService.cuestionario;
      this.respuestaUusario = this._RespuestaCuestionarioService.respuestas;
    }
  }

}
