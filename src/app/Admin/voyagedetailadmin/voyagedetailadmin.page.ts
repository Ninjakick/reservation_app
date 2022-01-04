import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { VoyageService } from '../../api/cooperative/voyage.service';

@Component({
  selector: 'app-voyagedetailadmin',
  templateUrl: './voyagedetailadmin.page.html',
  styleUrls: ['./voyagedetailadmin.page.scss'],
})
export class VoyagedetailadminPage implements OnInit {

  detailinfo :any;
	placedata : any;
	constructor(
		private storage: Storage,
		public modalController: ModalController,
		public navParams: NavParams,
		public voyageapi: VoyageService,
		public loadingController: LoadingController,
		public alertController: AlertController
	) {
		var datanav = JSON.parse(this.navParams.get('data'));
		var place = JSON.parse(this.navParams.get('place'));
		var datap = []
		var ksl = []
		for (var i = 0; i < place.length; i++) {
			var placereserver = place[i].place.split(",");
			for (var k = 0; k < placereserver.length; k++) {
				datap.push(parseInt(placereserver[k]));
			}
		}
		for (var i = 1; i <= parseInt(datanav.nombre_place); i++) {
			var kl = datap.filter(place=>{
				if (place == i) {
					return true
				}
				else{
					return false
				}
			})
			if (kl.length > 0) {
				ksl.push({place: kl[0], disponniblite: false})
			}
			else{
				ksl.push({place: i, disponniblite: true})
			}
		}
		this.placedata = ksl
		this.detailinfo = {
			'date_arr' : datanav.date_arr,
	        'date_dep' : datanav.date_dep,
	        'id' : datanav.id,
	        'marque' : datanav.marque,
	        'montant' : datanav.montant,
	        'numero':datanav.numero,
	        'lieu_arrive':datanav.lieu_arrive,
	        'lieu_depart':datanav.lieu_depart,
	        'nombre_place': datanav.nombre_place,
	        'nom': datanav.nom,
	        'id_cooperative': datanav.id_cooperative
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
