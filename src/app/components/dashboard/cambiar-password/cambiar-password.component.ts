import { UsuarioService } from './../../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {

  cambiarPassword: FormGroup;
  loading= false;

  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.checkPassword})
   }

  ngOnInit(): void {
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notSame: true};
  }

  guardarPassword(){

    this.loading=true;

    const changePassword: any ={
      passwordAnterior: this.cambiarPassword.get('passwordAnterior')?.value,
      nuevaPassword: this.cambiarPassword.get('password')?.value
    };

    this._usuarioService.changePassword(changePassword).subscribe(data =>{
      this.router.navigate(['/dashboard']);
      this.toastr.info(data.message, 'Contraseña actualizada' );
    },error =>{
      this.loading = false;
      console.log(error);
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message ,'Error');
    });
  }

  onTeclado(_evento:any){
    if(_evento.code === "Enter"){
      this.guardarPassword();
    }
  }

}
