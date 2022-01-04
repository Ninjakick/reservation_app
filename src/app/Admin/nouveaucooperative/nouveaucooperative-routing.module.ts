import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveaucooperativePage } from './nouveaucooperative.page';

const routes: Routes = [
  {
    path: '',
    component: NouveaucooperativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveaucooperativePageRoutingModule {}
