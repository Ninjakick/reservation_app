import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveltarifPageRoutingModule } from './nouveltarif-routing.module';

import { NouveltarifPage } from './nouveltarif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NouveltarifPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NouveltarifPage]
})
export class NouveltarifPageModule {}
