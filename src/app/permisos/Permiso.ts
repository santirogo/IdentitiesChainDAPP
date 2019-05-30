import {Documento} from '../../documento/Documento';

export class Permiso{
  duenio: string;
  documentos: Documento [];


  constructor(){
    this.documentos = [];
  }
}
