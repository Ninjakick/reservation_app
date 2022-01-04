import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientdetailcooperativePageRoutingModule } from './clientdetailcooperative-routing.module';

import { ClientdetailcooperativePage } from './clientdetailcooperative.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientdetailcooperativePageRoutingModule
  ],
  declarations: [ClientdetailcooperativePage]
})
export class ClientdetailcooperativePageModule {}
