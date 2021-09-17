import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RespuestaCuestionarioDetalle } from './../../../../../models/RespuestaCuestionarioDetalle';
import { RespuestaCuestionarioService } from './../../../../../services/respuesta-cuestionario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-respuesta',
  templateUrl: './detalle-respuesta.component.html',
  styleUrls: ['./detalle-respuesta.component.css']
})
export class DetalleRespuestaComponent implements OnInit, OnDestroy {

  idRespuesta: any;
  loading = false;
  cuestionario: any;
  respuestas: RespuestaCuestionarioDetalle[] = [];
  subscriptionRespuestaCuestionario: Subscription = new Subscription();
  nombreParticipante: any;

  constructor(private aroute: ActivatedRoute,
              private _respuestaCuestionarioService: RespuestaCuestionarioService,
              private toastr: ToastrService) {
    this.idRespuesta = this.aroute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getNombreParticipante();
    this.getListRespuestasYCuestionario();
  }

  ngOnDestroy(): void {
    this.subscriptionRespuestaCuestionario.unsubscribe();
  }

  getListRespuestasYCuestionario(): void {

    this.loading = true;

    this.subscriptionRespuestaCuestionario = this._respuestaCuestionarioService.getCuestionarioByIdRespuesta(this.idRespuesta).subscribe(data =>{
      this.cuestionario = data.cuestionario;
      this.respuestas = data.respuestas;
      this.loading = false;
    }, error =>{
      this.toastr.error('No se pudo cargar el resultado del cuestionario', 'Error');
      this.loading = false;
    });
  }

  getNombreParticipante(): void {
    this.nombreParticipante = localStorage.getItem('nombreParticipante');
  }

}
