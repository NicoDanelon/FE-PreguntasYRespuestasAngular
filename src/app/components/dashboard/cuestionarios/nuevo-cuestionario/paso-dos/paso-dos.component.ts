import { Cuestionario } from './../../../../../models/cuestionario';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from './../../../../../models/pregunta';
import { CuestionarioService } from './../../../../../services/cuestionario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent implements OnInit, OnDestroy {

  tituloCuestionario:string;
  descripcionCuestionario: string;
  listPreguntas: Pregunta[] = [];
  loading=false;
  subscriptionCuestionario: Subscription = new Subscription();

  constructor(private _cuestionarioService: CuestionarioService,
              private toastr: ToastrService,
              private router: Router) {
    this.tituloCuestionario="";
    this.descripcionCuestionario="";
   }

  ngOnInit(): void {
    this.tituloCuestionario = this._cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this._cuestionarioService.descripcionCuestionario;
  }

  ngOnDestroy(): void {
    this.subscriptionCuestionario.unsubscribe();
  }

  guardarPregunta(pregunta: Pregunta): void{
    this.listPreguntas.push(pregunta);
  }

  eliminarPregunta(index: number):void{
    this.listPreguntas.splice(index,1);
  }

  guardarCuestionario():void{

    this.loading = true;

    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    };

    this.subscriptionCuestionario = this._cuestionarioService.guardarCuestionario(cuestionario).subscribe(data =>{
      this.toastr.success('El cuestionario fue registrado con éxito', 'Cuestionario Registrado');
      this.router.navigate(['/dashboard']);
    }, error=>{
      this.toastr.error('Ocurrio un error', 'Error');
      this.loading = false;
    })
  }

}
