/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL_API = 'http://35.206.70.141:4000';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss'],
})
export class NotificacionComponent implements OnInit {

  @Input() in_iduser: number;
  denuncias: Denuncia[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  loadMessage() {
    this.http.post<any>(`${URL_API}/notificaciones_usuario`,{usuario_id: this.in_iduser}).subscribe(async data => {
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
  id: number;
  fecha_inicio: string;
  fecha_terminada: string;
  usuario_id: number;
  denuncia_id: number;
  comentario: string;
  fecha: string;
  zona: string;
  descripcion: number;
  estado: string;
  tipo_denuncia_id: number;
  num_fotos: 4;
}
