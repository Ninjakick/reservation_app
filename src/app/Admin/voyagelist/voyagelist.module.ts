import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyagelistPageRoutingModule } from './voyagelist-routing.module';

import { VoyagelistPage } from './voyagelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyagelistPageRoutingModule
  ],
  declarations: [VoyagelistPage]
})
export class VoyagelistPageModule {}
