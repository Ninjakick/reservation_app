import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-voyagedetail',
  templateUrl: './voyagedetail.page.html',
  styleUrls: ['./voyagedetail.page.scss'],
})
export class VoyagedetailPage implements OnInit {

	detailinfo :any;
	constructor(
		private storage: Storage,
		public modalController: ModalController,
		public navParams: NavParams,
	) {
		var datanav = JSON.parse(this.navParams.get('data'));
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
	// formatdate(date){
	// 	var temp = new Date(date);
	// 	var date = temp.getDate();
	// 	var month = temp.getMonth()+1;
	// 	var year = temp.getFullYear();
	// 	if (date.toString().length == 1) {
	// 		date = "0"+date;
	// 	}
	// 	if (month.toString().length == 1) {
	// 		month = "0"+month;
	// 	}
	// 	return date+"/"+month+"/"+year;
	// }
}
