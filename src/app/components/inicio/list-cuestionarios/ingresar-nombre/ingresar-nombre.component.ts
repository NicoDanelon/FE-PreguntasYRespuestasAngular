import { ToastrService } from 'ngx-toastr';
import { RespuestaCuestionarioService } from './../../../../services/respuesta-cuestionario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingresar-nombre',
  templateUrl: './ingresar-nombre.component.html',
  styleUrls: ['./ingresar-nombre.component.css']
})
export class IngresarNombreComponent implements OnInit {

  nombreParticipante = '';

  constructor(private router: Router,
              private _respuestaCuestionarioService: RespuestaCuestionarioService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this._respuestaCuestionarioService.idCuestionario == null){
      this.router.navigate(['/inicio']);
    }
  }

  siguiente(): void {
    this._respuestaCuestionarioService.nombreParticipante = this.nombreParticipante;
    if(this._respuestaCuestionarioService.nombreParticipante == null || '' || undefined){
      this.toastr.error('Ocurrio un error cargando tu Nombre', 'Error')
    }else{
      this.router.navigate(['/inicio/pregunta']);
    }
  }

}
