import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveltarifPage } from './nouveltarif.page';

const routes: Routes = [
  {
    path: '',
    component: NouveltarifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveltarifPageRoutingModule {}
