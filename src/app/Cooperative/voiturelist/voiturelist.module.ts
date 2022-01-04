import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoiturelistPageRoutingModule } from './voiturelist-routing.module';

import { VoiturelistPage } from './voiturelist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoiturelistPageRoutingModule
  ],
  declarations: [VoiturelistPage]
})
export class VoiturelistPageModule {}
