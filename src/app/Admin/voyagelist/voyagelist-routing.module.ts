import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyagelistPage } from './voyagelist.page';

const routes: Routes = [
  {
    path: '',
    component: VoyagelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyagelistPageRoutingModule {}
