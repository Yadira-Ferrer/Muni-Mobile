import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnonymusPagePage } from './anonymus-page.page';

const routes: Routes = [
  {
    path: '',
    component: AnonymusPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnonymusPagePageRoutingModule {}
