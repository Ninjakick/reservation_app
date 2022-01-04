import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailcooperativePage } from './detailcooperative.page';

const routes: Routes = [
  {
    path: '',
    component: DetailcooperativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailcooperativePageRoutingModule {}
