import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientdetailcooperativePage } from './clientdetailcooperative.page';

const routes: Routes = [
  {
    path: '',
    component: ClientdetailcooperativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientdetailcooperativePageRoutingModule {}
