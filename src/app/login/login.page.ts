import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';

const URL_API = 'http://35.206.70.141:4000';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username = '';
  password = '';
  iduser = -1;

  showPassword = false;
  passwordToggleIcon = 'eye-outline';

  constructor( public toastController: ToastController,
               private http: HttpClient,
               private router: Router) { }

  ngOnInit() {
  }

  // TODO enviar ID del usuario logueado...
  getCredentials() {
    if (this.username !== '' && this.password !== '') {
      this.http.post<any>(`${URL_API}/login`,{username: this.username,password:this.password}).subscribe(async data => {
        if (data.length > 0) {
          this.username = '';
          this.password = '';
          this.iduser = data[0].id;
          this.router.navigate(['/main'],{state: {iduser: this.iduser}});
          return false;
        } else {
          this.presentToast('Usuario Invalido.','danger');
        }
      });
    } else {
      this.presentToast('No se completaron todos los campos.', 'danger');
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

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if ( this.passwordToggleIcon === 'eye-outline') {
      this.passwordToggleIcon = 'eye-off-outline';
    } else {
      this.passwordToggleIcon = 'eye-outline';
    }
  }

}
