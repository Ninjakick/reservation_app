import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailclientPageRoutingModule } from './detailclient-routing.module';

import { DetailclientPage } from './detailclient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailclientPageRoutingModule
  ],
  declarations: [DetailclientPage]
})
export class DetailclientPageModule {}
