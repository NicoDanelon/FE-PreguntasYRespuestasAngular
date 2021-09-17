import { RespuestaCuestionario } from './../../../../models/respuestaCuestionario';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { RespuestaCuestionarioService } from './../../../../services/respuesta-cuestionario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  idCuestionario: any;
  subscriptionGetCuestionario: Subscription = new Subscription();
  subscriptionEliminarRespuesta: Subscription = new Subscription();
  loading = false;
  ListRespuestaCuestionario: RespuestaCuestionario[] = [];

  constructor(private aRoute: ActivatedRoute,
              private _respuestaCuestionarioService: RespuestaCuestionarioService,
              private toastr: ToastrService ) {
    this.idCuestionario = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getListCuestionarioService();
  }

  ngOnDestroy(): void{
    this.subscriptionGetCuestionario.unsubscribe();
    this.subscriptionEliminarRespuesta.unsubscribe();
  }

  getListCuestionarioService(): void {

    this.loading = true;

    this.subscriptionGetCuestionario = this._respuestaCuestionarioService.getListCuestionarioRespuesta(this.idCuestionario).subscribe(data =>{
      this.ListRespuestaCuestionario = data;
      this.loading = false;
    },error =>{
      this.loading = false;
      this.toastr.error('No se pudieron cargar las estadísticas', 'Error');
      console.log(error);
    })
  }

  eliminarRespuestaCuestionario(idRtaCuestionario:any): void {
    this.loading = true;
    this.subscriptionEliminarRespuesta = this._respuestaCuestionarioService.eliminarRespuestaCuestionario(idRtaCuestionario).subscribe(data =>{
      this.loading = false;
      this.toastr.error('La respuesta al cuestionario fue eliminada', 'Registro Eliminado');
      this.getListCuestionarioService();
    },error=>{
      this.loading = false;
      this.toastr.error('No se pudo eliminar la respuesta', 'ERROR!!');
      console.log(error);
    })
  }

  pasarNombre(nombre: any): void{
    this._respuestaCuestionarioService.setLocalStorage(nombre);
  }

}
