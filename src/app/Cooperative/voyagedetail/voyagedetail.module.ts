import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyagedetailPageRoutingModule } from './voyagedetail-routing.module';

import { VoyagedetailPage } from './voyagedetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyagedetailPageRoutingModule
  ],
  declarations: [VoyagedetailPage]
})
export class VoyagedetailPageModule {}
