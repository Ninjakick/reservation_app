import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CooperativelistPageRoutingModule } from './cooperativelist-routing.module';

import { CooperativelistPage } from './cooperativelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CooperativelistPageRoutingModule
  ],
  declarations: [CooperativelistPage]
})
export class CooperativelistPageModule {}
