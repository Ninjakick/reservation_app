import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveauvoyagePage } from './nouveauvoyage.page';

const routes: Routes = [
  {
    path: '',
    component: NouveauvoyagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveauvoyagePageRoutingModule {}
