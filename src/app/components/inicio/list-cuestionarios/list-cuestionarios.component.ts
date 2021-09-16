import { RespuestaCuestionarioService } from './../../../services/respuesta-cuestionario.service';
import { Subscription } from 'rxjs';
import { CuestionarioService } from './../../../services/cuestionario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cuestionarios',
  templateUrl: './list-cuestionarios.component.html',
  styleUrls: ['./list-cuestionarios.component.css']
})
export class ListCuestionariosComponent implements OnInit, OnDestroy {

  subscriptionListCuestionarios: Subscription = new Subscription();
  loading = false;
  listCuestionarios: any[] = [];

  constructor(private _cuestionarioService: CuestionarioService,
              private router: Router,
              private _respuestaCuestionarioService: RespuestaCuestionarioService) { }

  ngOnInit(): void {
    this.getListCuestionarios();
  }

  ngOnDestroy(): void {
    this.subscriptionListCuestionarios.unsubscribe();
  }

  getListCuestionarios(): void {
    this.loading = true;
    this._cuestionarioService.getListCuestionarios().subscribe(data =>{
      this.listCuestionarios = data;
      this.loading = false;
    }, error=>{
      this.loading = false;
    })
  }

  IngresarNombre(idCuestionario: number):void{
    this._respuestaCuestionarioService.idCuestionario = idCuestionario;
    this.router.navigate(['/inicio/ingresarNombre'])
  }

}
