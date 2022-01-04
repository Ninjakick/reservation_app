import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailclientPage } from './detailclient.page';

const routes: Routes = [
  {
    path: '',
    component: DetailclientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailclientPageRoutingModule {}
