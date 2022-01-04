import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UtilisateurlistPageRoutingModule } from './utilisateurlist-routing.module';

import { UtilisateurlistPage } from './utilisateurlist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UtilisateurlistPageRoutingModule
  ],
  declarations: [UtilisateurlistPage]
})
export class UtilisateurlistPageModule {}
