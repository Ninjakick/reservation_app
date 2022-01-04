import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoyagedetailadminPageRoutingModule } from './voyagedetailadmin-routing.module';

import { VoyagedetailadminPage } from './voyagedetailadmin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoyagedetailadminPageRoutingModule
  ],
  declarations: [VoyagedetailadminPage]
})
export class VoyagedetailadminPageModule {}
