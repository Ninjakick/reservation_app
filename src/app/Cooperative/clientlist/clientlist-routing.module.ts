import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientlistPage } from './clientlist.page';

const routes: Routes = [
  {
    path: '',
    component: ClientlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientlistPageRoutingModule {}
