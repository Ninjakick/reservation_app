import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauvoyagePageRoutingModule } from './nouveauvoyage-routing.module';

import { NouveauvoyagePage } from './nouveauvoyage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveauvoyagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NouveauvoyagePage]
})
export class NouveauvoyagePageModule {}
