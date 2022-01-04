import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTabsPage } from './admin-tabs.page';

/*const routes: Routes = [
  {
    path: '',
    component: AdminTabsPage
  }
];*/
const routes: Routes = [
	{
	path: 'adminmenu',
	component: AdminTabsPage,
	children:
	  [
	    {
	      path: 'Utilisateur',
	      children:
	        [
	          {
	            path: '',
	            loadChildren: () => import('../utilisateurlist/utilisateurlist.module').then( m => m.UtilisateurlistPageModule)
	          }
	        ]
	    },
	    {
	      path: 'Voyage',
	      children:
	        [
	          {
	            path: '',
	            loadChildren: () => import('../voyagelist/voyagelist.module').then( m => m.VoyagelistPageModule)
	          }
	        ]
	    },
	    {
	      path: '',
	      redirectTo: 'adminmenu/Utilisateur',
	      pathMatch: 'full'
	    }
	  ]
	},
	{
		path: '',
		redirectTo: 'adminmenu/Utilisateur',
		pathMatch: 'full'
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTabsPageRoutingModule {}
