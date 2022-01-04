import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveauclientPage } from './nouveauclient.page';

const routes: Routes = [
  {
    path: '',
    component: NouveauclientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveauclientPageRoutingModule {}
