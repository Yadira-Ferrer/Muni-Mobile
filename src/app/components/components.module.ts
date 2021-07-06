import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ListaDenunciasComponent } from './lista-denuncias/lista-denuncias.component';
import { NuevaDenunciaComponent } from './nueva-denuncia/nueva-denuncia.component';
import { NotificacionComponent } from './notificacion/notificacion.component';


@NgModule({
  declarations: [
    ListaDenunciasComponent,
    NuevaDenunciaComponent,
    NotificacionComponent
  ],
  exports: [
    ListaDenunciasComponent,
    NuevaDenunciaComponent,
    NotificacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
