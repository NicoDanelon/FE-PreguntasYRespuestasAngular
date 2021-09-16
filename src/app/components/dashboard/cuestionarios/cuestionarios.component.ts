import { Cuestionario } from './../../../models/cuestionario';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CuestionarioService } from './../../../services/cuestionario.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit, OnDestroy {

  nombreUsuario:string | null;
  subscriptionCuestionarios: Subscription = new Subscription();
  subscriptionEliminarCuestionario: Subscription = new Subscription();
  listCuestionarios: Cuestionario[] = [];
  loading= false;

  constructor(private _loginService: LoginService,
              private _cuestionarioService: CuestionarioService,
              private toastr: ToastrService ) {
    this.nombreUsuario="";
   }

  ngOnInit(): void {
    this.getNombreUsuario();
    this.getCuestionarios();
  }

  ngOnDestroy():void{
    this.subscriptionCuestionarios.unsubscribe();
    this.subscriptionEliminarCuestionario.unsubscribe();
  }

  getNombreUsuario(): void{
    this.nombreUsuario = this._loginService.getTokenDecoded().sub;
  }

  getCuestionarios(): void{
    this.loading = true;
    this.subscriptionCuestionarios = this._cuestionarioService.getListCuestionarioByIdUser().subscribe(data =>{
      this.listCuestionarios = data;
      this.loading = false;
    },error =>{
      this.loading = false;
      this.toastr.error('No se pudieron cargar los cuestionarios' , 'Error');
      console.log(error);
    })
  }

  eliminarCuestionario(idCuestionario: any): void{
    if(confirm('Eliminar cuestionario?')){
      this.loading = true;
      this.subscriptionEliminarCuestionario = this._cuestionarioService.deleteCuestionario(idCuestionario).subscribe(data => {
        this.toastr.success('El cuestionario fue eliminado', 'Cuestionario Eliminado');
        this.getCuestionarios();
        this.loading = false;
      }, error => {
        this.toastr.error('No se pudo eliminar el cuestionario', 'Error');
        this.loading = false;
      })
    }
  }

}
