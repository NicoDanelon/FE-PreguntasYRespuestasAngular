export class RespuestaCuestionario{

  id?:number;
  cuestionarioId: number;
  nombreParticipante: string;
  listRtaCuestionarioDetalle: any;
  fecha?: Date;

  constructor(respuestaId: number, nombreParticipante: string) {
    this.cuestionarioId = respuestaId;
    this.nombreParticipante = nombreParticipante;
  }
}
