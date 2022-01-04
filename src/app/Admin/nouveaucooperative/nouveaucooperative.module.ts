import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveaucooperativePageRoutingModule } from './nouveaucooperative-routing.module';

import { NouveaucooperativePage } from './nouveaucooperative.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveaucooperativePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NouveaucooperativePage]
})
export class NouveaucooperativePageModule {}
