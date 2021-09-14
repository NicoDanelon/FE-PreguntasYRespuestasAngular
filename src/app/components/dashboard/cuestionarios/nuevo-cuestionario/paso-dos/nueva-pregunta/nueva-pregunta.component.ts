import { Respuesta } from './../../../../../../models/respuesta';
import { ToastrService } from 'ngx-toastr';
import { Pregunta } from './../../../../../../models/pregunta';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, Form } from '@angular/forms';

@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {

  nuevaPregunta: FormGroup;
  //pregunta?: Pregunta;
  rtaCorrecta = 0;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService) {
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([])
    })
   }

  @Output() enviarPregunta = new EventEmitter<Pregunta>();

  ngOnInit(): void {
    this.agregarRespuestasPorDefecto();
  }

  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }

  agregarRespuesta(): void{
    this.getRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      esCorrecta: 0
    }));
  }

  agregarRespuestasPorDefecto():void{
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(index: number): void{
    if(this.getRespuestas.length===2){
      this.toastr.error('Como minimo la pregutna debe contener dos respuestas', 'Error');
    }else{
      this.getRespuestas.removeAt(index);
    }
  }

  setRespuestaValida(index: number): void{
    this.rtaCorrecta = index;
  }

  agregarPregunta(): void {
    // Obtenemos el titulo de la pregunta
    const descripcionPregunta = this.nuevaPregunta.get('titulo')?.value;

    // Obtenemos el array de respuestas
    const arrayRespuestas = this.nuevaPregunta.get('respuestas')?.value;

    // Creamos un array de respuestas
    const arrayRta: Respuesta[] = [];

    arrayRespuestas.forEach((element: any , index: any) => {
      const respuesta: Respuesta = new Respuesta(element.descripcion, false);
      if (index === this.rtaCorrecta){
        respuesta.esCorrecta = true;
      }
      arrayRta.push(respuesta);
    });

    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta);

    this.enviarPregunta.emit(pregunta);
    this.reset();
  }

  reset(): void{
    this.rtaCorrecta = 0;
    this.nuevaPregunta.reset();
    this.getRespuestas.clear();
    this.agregarRespuestasPorDefecto();
  }

}
