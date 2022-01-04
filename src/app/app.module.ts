import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { NouveauclientPageModule } from './Admin/nouveauclient/nouveauclient.module';
import { NouveaucooperativePageModule } from './Admin/nouveaucooperative/nouveaucooperative.module';
import { DetailclientPageModule } from './Admin/detailclient/detailclient.module';
import { DetailcooperativePageModule } from './Admin/detailcooperative/detailcooperative.module';
import { ClientdetailcooperativePageModule } from './Cooperative/clientdetailcooperative/clientdetailcooperative.module';
import { MenuPageModule } from './Cooperative/menu/menu.module'
import { NouveltarifPageModule } from './Cooperative/nouveltarif/nouveltarif.module';
import { NouvelvoiturePageModule } from './Cooperative/nouvelvoiture/nouvelvoiture.module';
import { VoyagedetailPageModule } from './Cooperative/voyagedetail/voyagedetail.module';
import { NouveauvoyagePageModule } from './Cooperative/nouveauvoyage/nouveauvoyage.module';
import { CooperativedetailPageModule } from './Client/cooperativedetail/cooperativedetail.module';
import { VoyagedetailadminPageModule } from './Admin/voyagedetailadmin/voyagedetailadmin.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule,
  	IonicModule.forRoot(),
  	AppRoutingModule,
    NouveauclientPageModule,
    NouveaucooperativePageModule,
    DetailclientPageModule,
    DetailcooperativePageModule,
    NouveltarifPageModule,
    ClientdetailcooperativePageModule,
    MenuPageModule,
    NouvelvoiturePageModule,
    VoyagedetailPageModule,
    NouveauvoyagePageModule,
    CooperativedetailPageModule,
    VoyagedetailadminPageModule,
  	IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
