import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouvelvoiturePageRoutingModule } from './nouvelvoiture-routing.module';

import { NouvelvoiturePage } from './nouvelvoiture.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouvelvoiturePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NouvelvoiturePage]
})
export class NouvelvoiturePageModule {}
