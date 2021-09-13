export class Respuesta{
  id?: number;
  descripcion: string;
  esCorrecta: boolean;

  constructor(descripcion: string, esCorrecta: boolean, id?: number){
    this.descripcion = descripcion;
    this.esCorrecta = esCorrecta;
    this.id = id;
  }
}
