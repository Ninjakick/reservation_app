import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyagedetailPage } from './voyagedetail.page';

const routes: Routes = [
  {
    path: '',
    component: VoyagedetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyagedetailPageRoutingModule {}
