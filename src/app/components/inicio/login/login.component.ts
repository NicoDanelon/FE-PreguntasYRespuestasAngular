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
              private router: Router) {
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
    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password
    }
    this.loading=true;
    setTimeout(()=>{
      if(usuario.nombreUsuario === 'ndanelon' && usuario.password === 'admin123'){
        this.router.navigate(['/dashboard']);
        this.login.reset();
      }else{
        this.toastr.error('Usuario o contraseña incorrecto', 'Error');
        this.login.reset();
      }
      this.loading= false;
    }, 3000)
  }
}
