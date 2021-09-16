import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CuestionarioService } from './../../../../services/cuestionario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.css']
})
export class CuestionarioComponent implements OnInit {

  idCuestionario: any;
  subscriptionGetCuestionario: Subscription = new Subscription();
  loading = false;
  cuestionario: any = {};

  constructor(private _cuestionarioService: CuestionarioService,
              private aRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.idCuestionario = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getCuestionario();
  }

  getCuestionario(): void{
    this.loading= true;
    this.subscriptionGetCuestionario = this._cuestionarioService.getCuestionario(this.idCuestionario).subscribe(data => {
      this.cuestionario = data;
      this.loading = false;
    }, error =>{
      this.loading = false;
      this.toastr.error('No se pudo cargar el Cuestionario', 'Error');
    })
  }
}
