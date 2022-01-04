import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detailcooperative',
  templateUrl: './detailcooperative.page.html',
  styleUrls: ['./detailcooperative.page.scss'],
})
export class DetailcooperativePage implements OnInit {
	detailinfo :any;
	constructor(
		private storage: Storage,
		public modalController: ModalController,
		public navParams: NavParams,
	) {
		var datanav = JSON.parse(this.navParams.get('data'));
		this.detailinfo = {
			'nom' : datanav.nom,
	        'type' : datanav.type,
	        'login' : datanav.login,
	        'adress' : datanav.adresse,
	        'mdp' : datanav.mdp,
	        'id':datanav.id
		}
	}
	async dismissModal(){
		this.modalController.dismiss({
	      'dismissed': true
	    });
	}
	ngOnInit() {
	}
}
