import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnonymusPagePageRoutingModule } from './anonymus-page-routing.module';

import { AnonymusPagePage } from './anonymus-page.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnonymusPagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [AnonymusPagePage]
})
export class AnonymusPagePageModule {}
