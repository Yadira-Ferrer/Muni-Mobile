/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL_API = 'http://35.206.70.141:4000';
@Component({
  selector: 'app-lista-denuncias',
  templateUrl: './lista-denuncias.component.html',
  styleUrls: ['./lista-denuncias.component.scss'],
})
export class ListaDenunciasComponent implements OnInit {

  @Input() in_iduser: number;

  denuncias: Denuncia[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDenuncias();
  }

  getDenuncias() {
    this.http.post<any>(`${URL_API}/denuncias_usuario`,{usuario_id: this.in_iduser}).subscribe(async data => {
      if (data.length > 0) {
        //console.log('Data:',data);
        for (const d of data) {
          this.denuncias.push(d);
        }
      }
    });
  }

}
interface Denuncia {
    id: string;
    fecha: string;
    zona: number;
    descripcion: string;
    estado: string;
    usuario_id: number;
    tipo_denuncia_id: number;
    num_fotos: number;
}
