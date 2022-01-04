import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouvelvoiturePage } from './nouvelvoiture.page';

const routes: Routes = [
  {
    path: '',
    component: NouvelvoiturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouvelvoiturePageRoutingModule {}
