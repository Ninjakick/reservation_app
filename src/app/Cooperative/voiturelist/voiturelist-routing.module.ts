import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoiturelistPage } from './voiturelist.page';

const routes: Routes = [
  {
    path: '',
    component: VoiturelistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoiturelistPageRoutingModule {}
