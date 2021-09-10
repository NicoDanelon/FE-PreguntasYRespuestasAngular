import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup;
  loading=false;

  constructor(private fb: FormBuilder,
              private _usuarioService: UsuarioService,
              private toastr: ToastrService,
              private router: Router) {
    this.register = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.checkPassword})
   }

  ngOnInit(): void {
  }

  registrarUsuario(){
    this.loading = true;
    const usuario: Usuario = {
      nombreUsuario: this.register.value.usuario,
      password: this.register.value.password
    }
    this._usuarioService.saveUser(usuario).subscribe(data => {
      this.loading=false;
      this.toastr.success('El usuario ' + usuario.nombreUsuario + ' fue registrado con exito.' ,'Usuario Registrado');
      this.router.navigate(['/inicio/login']);
    },error =>{
      this.loading=false;
      //this.register.reset(); No me gusta me estresa
      this.toastr.error(error.error.message,'Usuario no disponible')
    })
  }

  checkPassword(group: FormGroup): any{
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notSame: true};
  }

  onTeclado(_evento:any){
    if(_evento.code === "Enter"){
      this.registrarUsuario();
    }
  }

}
