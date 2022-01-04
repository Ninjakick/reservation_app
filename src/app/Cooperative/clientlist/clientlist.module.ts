import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientlistPageRoutingModule } from './clientlist-routing.module';

import { ClientlistPage } from './clientlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientlistPageRoutingModule
  ],
  declarations: [ClientlistPage]
})
export class ClientlistPageModule {}
