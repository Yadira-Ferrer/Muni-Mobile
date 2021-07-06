/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
import { Component, Input } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

const URL_API = 'http://35.206.70.141:4000';

@Component({
  selector: 'app-nueva-denuncia',
  templateUrl: './nueva-denuncia.component.html',
  styleUrls: ['./nueva-denuncia.component.scss'],
})
export class NuevaDenunciaComponent {

  @Input() in_iduser: number;

  zonas: number[] = [1,2,3,4,5,6,7,8,9,10,11];
  images: string[] = [];
  datetime = '';

  report = {
    fecha: '',
    zona: 0,
    tipo_denuncia_id: 0,
    descripcion: '',
    estado: 0,
    usuario_id: 0,
    num_fotos: 0
  };
  
  constructor( public toastController: ToastController,
               private http: HttpClient) { }

  public takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64
    });

    const imgb64 = image.base64String;
    // Can be set to the src of an image now
    this.images.push(imgb64);
    //console.log(imgb64);
  };

  public getFromGallery = async () => {
    const image = await Camera.getPhoto({
      quality: 80,
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64
    });

    const imgb64 = image.base64String;
    // Can be set to the src of an image now
    this.images.push(imgb64);
    //console.log(imgb64);
  };  

  deleteImage(index) {
    this.images.splice(index, 1);
  }

  sendReport() {
    this.report.fecha = this.datetime.split('T')[0];
    this.report.num_fotos = this.images.length;
    this.report.usuario_id = this.in_iduser;
    console.log(this.report);
    
    if (this.report.fecha !== '' && this.report.zona !== 0 && this.report.descripcion !== '' && this.report.tipo_denuncia_id !== 0) {
      this.http.post<any>(`${URL_API}/denuncia`,this.report).subscribe(async data => {
        this.presentToast('Denuncia creada Exitosamente.', 'medium');
      });
    } else {
      this.presentToast('No se completaron todos los campos.', 'danger');
    }

    if (this.images.length > 0) {
      this.http.post<any>(`${URL_API}/image`,{id:this.in_iduser,images:this.images}).subscribe(async data => {
        //this.presentToast('Denuncia creada Exitosamente.', 'medium');
        this.resetValues();
      });
    }

  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      mode: 'ios'
    });
    toast.present();
  }

  resetValues() {
    this.report.fecha = '';
    this.report.descripcion = '';
    this.report.zona = 0;
    this.report.tipo_denuncia_id = 0;
    this.report.num_fotos = 0;
    this.report.usuario_id = 0;
    this.images = [];
    this.datetime = '';
  }

}
