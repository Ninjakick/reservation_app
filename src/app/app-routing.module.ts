import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './Cooperative/menu/menu.page';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'adminmenu',
    loadChildren: () => import('./Admin/admin-tabs/admin-tabs.module').then( m => m.AdminTabsPageModule)
  },
  {
    path: 'clientmenu',
    loadChildren: () => import('./Client/acceuil/acceuil.module').then( m => m.AcceuilPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'cooperativemenu',
    component: MenuPage,
    children:
    [
        {
          path: 'voyage',
          children:
            [
              {
                path: '',
                loadChildren: () => import('./Cooperative/acceuil/acceuil.module').then( m => m.AcceuilPageModule)
              }
            ]
        },
        {
          path: 'client',
          children:
            [
              {
                path: '',
                loadChildren: () => import('./Cooperative/clientlist/clientlist.module').then( m => m.ClientlistPageModule)
              }
            ]
        },
        {
          path: 'tarif',
          children:
            [
              {
                path: '',
                loadChildren: () => import('./Cooperative/tarif/tarif.module').then( m => m.TarifPageModule)
              }
            ]
        },
        {
          path: 'voiture',
          children:
            [
              {
                path: '',
                loadChildren: () => import('./Cooperative/voiturelist/voiturelist.module').then( m => m.VoiturelistPageModule)
              }
            ]
        }
    ]
  },
  {
    path:"adminmenu/adminmenu/Deconnection",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:"cooperativemenu/deconnection",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'voyagedetailadmin',
    loadChildren: () => import('./Admin/voyagedetailadmin/voyagedetailadmin.module').then( m => m.VoyagedetailadminPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
