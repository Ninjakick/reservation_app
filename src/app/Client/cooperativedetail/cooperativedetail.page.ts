import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { VoyageService } from '../../api/cooperative/voyage.service';

@Component({
  selector: 'app-cooperativedetail',
  templateUrl: './cooperativedetail.page.html',
  styleUrls: ['./cooperativedetail.page.scss'],
})
export class CooperativedetailPage implements OnInit {
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
	async reservation(data){
		var loading = await this.loadingController.create({
	    	message: 'Veuillez patienter... '
	    });
	    var alertf = await this.alertController.create({
	      header: 'Erreur!',
	      message: 'Impossible de communiquer avec le serveur',
	      buttons: ['Ok']
	    });
	    var alertfss = await this.alertController.create({
	      header: 'Erreur!',
	      message: 'Le frais que vous voulez payé est plus chere que le frais du voyage',
	      buttons: ['Ok']
	    });
	    var alertfs = await this.alertController.create({
	      header: 'Felicitation!',
	      message: 'Votre reservation a été reserver',
	      buttons: ['Ok']
	    });
		const alert = await this.alertController.create({
			header: 'Entrer la somme que vous voulez payer(ariary)',
			inputs: [
			{
			  name: 'argent',
			  type: 'number',
			  placeholder: 'Avance à payé'
			},
			],
			buttons: [
			{
			  text: 'Cancel',
			  role: 'cancel',
			  cssClass: 'secondary',
			  handler: () => {
			    console.log('Confirm Cancel');
			  }
			}, {
			  text: 'Ok',
			  handler: (alertdata) => {
			  	if (parseInt(this.detailinfo.montant)< parseInt(alertdata.argent)) {
			  		alertfss.present();
			  		return false
			  	}
			  	this.storage.get('id').then(async (val) => {
					if (val != ""){
				        var obj = {
					  		id_voyage : this.detailinfo.id,
					  		place: data.place,
					  		frais_paye: alertdata.argent,
					  		reste_paye: parseInt(this.detailinfo.montant) - parseInt(alertdata.argent),
					  		id_client: val
					  	};
					  	this.storage.get('urlserveur').then(async (val) => {
							if (val != ""){
								await loading.present();
						        await this.voyageapi.sendreservation(val, obj)
						          .subscribe(res => {
						            loading.dismiss();
						            alertfs.present();
						          }, (err) => {
						            loading.dismiss();
						            alertf.present();
						        });
							}
					    });
					}
			    });
			  	console.log(alertdata.argent)
			  }
			}
			]
	    });
  		await loading.dismiss();
	    await alert.present();
	}
}
