import { CuestionarioService } from './../../../../../services/cuestionario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css']
})
export class PasoUnoComponent implements OnInit {
  datosCuestionario: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private _cuestionarioService: CuestionarioService) {
    this.datosCuestionario = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  pasoUno(): void{
    this._cuestionarioService.tituloCuestionario = this.datosCuestionario.value.titulo;
    this._cuestionarioService.descripcionCuestionario = this.datosCuestionario.value.descripcion;
    this.router.navigate(['/dashboard/nuevoCuestionario/pasoDos']);
  }

}
