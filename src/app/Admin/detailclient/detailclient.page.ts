import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detailclient',
  templateUrl: './detailclient.page.html',
  styleUrls: ['./detailclient.page.scss'],
})
export class DetailclientPage implements OnInit {
	detailinfo :any;
	constructor(
		private storage: Storage,
		public modalController: ModalController,
		public navParams: NavParams,
	) {
		var datanav = JSON.parse(this.navParams.get('data'));
		this.detailinfo = {
			'nom' : datanav.nom,
	        'prenom' : datanav.prenom,
	        'numero' : datanav.numero,
	        'adress' : datanav.adresse,
	        'date_naissance' : datanav.date_naissance,
	        'mdp' : datanav.mdp,
	        'id':datanav.id
		}
	}

	ngOnInit() {
	}
	async dismissModal(){
		this.modalController.dismiss({
	      'dismissed': true
	    });
	}
}
