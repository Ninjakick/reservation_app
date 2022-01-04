import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceuilPage } from './acceuil.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: AcceuilPage
//   }
// ];
const routes: Routes = [
	{
	path: 'clientmenu',
	component: AcceuilPage,
	children:
	  [
	    {
	      path: 'Cooperative',
	      children:
	        [
	          {
	            path: '',
	            loadChildren: () => import('../cooperativelist/cooperativelist.module').then( m => m.CooperativelistPageModule)
	          }
	        ]
	    },
	    {
	      path: 'Historique',
	      children:
	        [
	          {
	            path: '',
	            loadChildren: () => import('../historique/historique.module').then( m => m.HistoriquePageModule)
	          }
	        ]
	    },
	    {
	      path: 'Parametre',
	      children:
	        [
	          {
	            path: '',
	            loadChildren: () => import('../parametre/parametre.module').then( m => m.ParametrePageModule)
	          }
	        ]
	    },
	    {
	      path: '',
	      redirectTo: 'clientmenu/Cooperative',
	      pathMatch: 'full'
	    }
	  ]
	},
	{
		path: '',
		redirectTo: 'clientmenu/Cooperative',
		pathMatch: 'full'
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceuilPageRoutingModule {}
