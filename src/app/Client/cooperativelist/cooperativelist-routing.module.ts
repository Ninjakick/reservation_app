import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CooperativelistPage } from './cooperativelist.page';

const routes: Routes = [
  {
    path: '',
    component: CooperativelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CooperativelistPageRoutingModule {}
