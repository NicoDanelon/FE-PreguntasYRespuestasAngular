import { RespuestaCuestionario } from './../../../../models/respuestaCuestionario';
import { RespuestaCuestionarioDetalle } from './../../../../models/RespuestaCuestionarioDetalle';
import { Pregunta } from './../../../../models/pregunta';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CuestionarioService } from './../../../../services/cuestionario.service';
import { RespuestaCuestionarioService } from './../../../../services/respuesta-cuestionario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit, OnDestroy {

  idCuestionario: any;
  subscriptionCuestionario: Subscription = new Subscription();
  loading = false;
  listPreguntas: Pregunta[] = [];
  rtaConfirmada = false;
  opcionSeleccionada: any;
  index = 0;
  idRespuestaSeleccionada: any;
  listRespuestaDetalle: RespuestaCuestionarioDetalle[] = [];
  subscriptionEnviarRespuestas: Subscription = new Subscription();

  constructor(private _respuestaCuestionarioService: RespuestaCuestionarioService,
              private _cuestionarioService: CuestionarioService,
              private toastr: ToastrService,
              private router: Router) {
   }

  ngOnInit(): void {
    this.idCuestionario = this._respuestaCuestionarioService.idCuestionario;
    if(this.idCuestionario == null){
      this.router.navigate(['/inicio']);
      return;
    }else{
        this.getCuestionario();
        this._respuestaCuestionarioService.respuestas = [];
    }
  }

  ngOnDestroy(): void {
    this.subscriptionCuestionario.unsubscribe();
    this.subscriptionEnviarRespuestas.unsubscribe();
  }

  getCuestionario(): void{
    this.loading=true;
    this.subscriptionCuestionario = this._cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data =>{
      this.listPreguntas = data.listPreguntas;
      this._respuestaCuestionarioService.cuestionario = data;
      this.loading = false;
    },error =>{
      this.toastr.error('No se pudo cargar el cuestionario', 'Error');
      this.loading=false;
      console.log(error);
    })
  }

  obtenerPregunta(): string{
    return this.listPreguntas[this.index].descripcion;
  }

  getIndex(): number{
    return this.index;
  }

  respuestaSeleccionada(respuesta:any, idRespuesta:any): void {
    this.opcionSeleccionada = respuesta;
    this.rtaConfirmada = true;
    this.idRespuestaSeleccionada = idRespuesta;
  }

  AddClassOption(respuesta:any): any {
    if (respuesta === this.opcionSeleccionada){
      return 'active text-light';
    }
  }

  siguiente():void{

    this._respuestaCuestionarioService.respuestas.push(this.idRespuestaSeleccionada);

    const detalleRespuesta: RespuestaCuestionarioDetalle = {
      respuestaId: this.idRespuestaSeleccionada
    };

    this.listRespuestaDetalle.push(detalleRespuesta);

    this.rtaConfirmada = false;
    this.index++;
    this.idRespuestaSeleccionada = null;

    if(this.index === this.listPreguntas.length){
      this.guardarRespuestaCuestionario();
      this.router
    }
  }

  guardarRespuestaCuestionario(): void{

    this.loading = true;

    const rtaCuestionario: RespuestaCuestionario = {
      cuestionarioId: this._respuestaCuestionarioService.idCuestionario,
      nombreParticipante: this._respuestaCuestionarioService.nombreParticipante,
      listRtaCuestionarioDetalle: this.listRespuestaDetalle
    };

    this.subscriptionEnviarRespuestas = this._respuestaCuestionarioService.guardarRespuestaCuestionario(rtaCuestionario).subscribe(data =>{
      this.router.navigate(['/inicio/respuestaCuestionario']);
    },error=>{
      this.loading = false;
      this.toastr.error('No se pudo enviar las respuestas', 'Error');
      console.log(error);
    });
  }

}
