import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {Usuario} from '../../../models/usuario'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  loading=false;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private _loginService: LoginService) {
    this.login = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onTeclado(_evento:any){
    if(_evento.code === "Enter"){
      this.log();
    }
  }

  log(){
    this.loading=true;

    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }

    this._loginService.login(usuario).subscribe(data=>{
      this._loginService.setLocalStorage(data.usuario);
      this.loading = false;
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      this.toastr.error(error.error.message, 'Usuario o contraseña incorrecto.');
      this.loading = false;
    })

  }
}
