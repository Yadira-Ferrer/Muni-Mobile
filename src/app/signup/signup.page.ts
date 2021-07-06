/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

const URL_API = 'http://35.206.70.141:4000';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  showPassword = false;
  passwordToggleIcon = 'eye-outline';
  telstr = '';
  user =  {
    nombre: '',
    apellido: '',
    celular: 0,
    domicilio: '',
    username: '',
    password: '',
    tipo_usuario_id: 3
  };

  constructor( public toastController: ToastController,
               private http: HttpClient,
               private router: Router) { }

  ngOnInit() {}

  getUserInfo() {
    this.user.celular = +this.telstr;
    if (this.user.username !== '' && this.user.password !== '') {
      console.log(this.user);
      this.http.post<any>(`${URL_API}/usuario`, this.user).subscribe(async data => {
          this.userResetValue();
          this.presentToast('Usuario registrado exitosamente.', 'medium');
          this.router.navigate(['/home']);
          return false;
      });
    } else {
      this.presentToast('No se completaron los campos obligatorios.', 'danger');
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

  userResetValue() {
    this.telstr = '';
    this.user.nombre = '';
    this.user.apellido = '';
    this.user.celular = 0;
    this.user.domicilio = '';
    this.user.username = '';
    this.user.password = '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if ( this.passwordToggleIcon === 'eye-outline') {
      this.passwordToggleIcon = 'eye-off-outline';
    } else {
      this.passwordToggleIcon = 'eye-outline';
    }
  }

}
