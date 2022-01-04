import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CooperativedetailPageRoutingModule } from './cooperativedetail-routing.module';

import { CooperativedetailPage } from './cooperativedetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CooperativedetailPageRoutingModule
  ],
  declarations: [CooperativedetailPage]
})
export class CooperativedetailPageModule {}
