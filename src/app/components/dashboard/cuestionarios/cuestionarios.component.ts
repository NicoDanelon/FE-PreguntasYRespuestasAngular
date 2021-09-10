import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.component.html',
  styleUrls: ['./cuestionarios.component.css']
})
export class CuestionariosComponent implements OnInit {

  nombreUsuario:string | null;

  constructor(private _loginService: LoginService) {
    this.nombreUsuario="";
   }

  ngOnInit(): void {
    this.getNombreUsuario();
  }

  getNombreUsuario(): void{
    this.nombreUsuario = this._loginService.getNombreUsuario();
  }

}
