import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauclientPageRoutingModule } from './nouveauclient-routing.module';

import { NouveauclientPage } from './nouveauclient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NouveauclientPageRoutingModule
  ],
  declarations: [NouveauclientPage]
})
export class NouveauclientPageModule {}
