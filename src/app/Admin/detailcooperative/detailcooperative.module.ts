import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailcooperativePageRoutingModule } from './detailcooperative-routing.module';

import { DetailcooperativePage } from './detailcooperative.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailcooperativePageRoutingModule
  ],
  declarations: [DetailcooperativePage]
})
export class DetailcooperativePageModule {}
