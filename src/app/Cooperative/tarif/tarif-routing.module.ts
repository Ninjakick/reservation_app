import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarifPage } from './tarif.page';

const routes: Routes = [
  {
    path: '',
    component: TarifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifPageRoutingModule {}
