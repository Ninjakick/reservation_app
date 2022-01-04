import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoyagedetailadminPage } from './voyagedetailadmin.page';

const routes: Routes = [
  {
    path: '',
    component: VoyagedetailadminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoyagedetailadminPageRoutingModule {}
