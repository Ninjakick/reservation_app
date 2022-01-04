import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ModalController } from '@ionic/angular';
 
import { Storage } from '@ionic/storage';

import { VoyageService } from '../../api/cooperative/voyage.service';

import { VoyagedetailPage } from '../voyagedetail/voyagedetail.page';
import { NouveauvoyagePage } from '../nouveauvoyage/nouveauvoyage.page';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {
	public donnevoyage : any;
	public donnevoyageinitial : any;
	constructor(public loadingController: LoadingController,public alertController: AlertController, public voyageapi: VoyageService,private storage: Storage, public modalController: ModalController) {
		this.loaddata();
	}
	ngOnInit() {
	}
	async loaddata(){
	  	const loading = await this.loadingController.create({
	    	message: 'Veuillez patienter... '
	    });
	    await loading.present();
	    const alertf = await this.alertController.create({
	      header: 'Erreur!',
	      message: 'Impossible de communiquer avec le serveur',
	      buttons: ['Ok']
	    });
	  	await this.storage.get('urlserveur').then(async (val) => {
	      if (val != "") {
	      	await this.storage.get('id_cooperative').then(async (id) => {
	      		if (id != "") {
	      			var obj = {
	      				"id_cooperative": id
	      			}
			        await this.voyageapi.getlistvoyage(val, obj)
			          .subscribe(res => {
			            loading.dismiss();
			            console.log(res)
			            this.donnevoyage = res.voyage;
			            this.donnevoyageinitial = res.voyage;
			          }, (err) => {
			            loading.dismiss();
			            alertf.present();
			        });
			    }
	          	else{
		        	await loading.dismiss();
		       		await alertf.present();
		      	}
		    });
	      }
	      else{
	        await loading.dismiss();
	        await alertf.present();
	      }
	    });
	}
	async nouveau(){
		var modal = await this.modalController.create({
	      component: NouveauvoyagePage
	    });
	    await modal.present();
	    var { data } = await modal.onWillDismiss();
		if (data.dismissed) {
			this.loaddata();
		}
	}
	SearchinputChanged(event){
		this.donnevoyage = this.donnevoyageinitial;
		this.donnevoyage = this.donnevoyage.filter(client=>{
			if (client.date_dep.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.date_arr.toLowerCase().indexOf(event.toLowerCase()) != -1  || client.lieu_arrive.toLowerCase().indexOf(event.toLowerCase()) != -1  || client.lieu_depart.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.marque.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.numero.toLowerCase().indexOf(event.toLowerCase()) != -1 ) {
				return true
			}
			else{
				return false
			}
		})
	}
	async editvoyage(data){
	  	var modal = await this.modalController.create({
	    	component: NouveauvoyagePage,
	    	componentProps: {
	    		"type": "edit",
	    		"data": JSON.stringify(data)
	    	}
	    });
	    await modal.present();
	    await modal.onWillDismiss();
		this.loaddata();
	}
	async detailvoyage(data){
		var modal = await this.modalController.create({
	      component: VoyagedetailPage,
	      componentProps: { data : JSON.stringify(data)}
	    });
	    return await modal.present();
	}
	async supprimevoyage(id){
		var obj = {id: id};
		var alertf = await this.alertController.create({
			header: 'Erreur!',
				message: 'Impossible de communiquer avec le serveur',
			buttons: ['Ok']
		});
		var alertsucces = await this.alertController.create({
		  message: 'Suppressiom de voiture effetuer avec success!',
		  buttons: [{
		    text: 'Continuer',
		    handler: () => {
		      this.loaddata();
		    }
		  }]
		});
		var loading = await this.loadingController.create({
			message: 'Veuillez patienter... '
		});
		var alert = await this.alertController.create({
		  header: 'Attention',
		  message: 'Vous êtes sur le point de supprimer ce voiture. Etes vous sûr de vouloir continuer?',
		  buttons: [
		    {
		      text: 'Annuler',
		      role: 'cancel',
		      cssClass: 'secondary',
		      handler: (blah) => {
		        console.log('Confirm Cancel: blah');
		      }
		    }, {
		      text: 'Continuer',
		      handler: () => {
		      	loading.present();
		      	this.storage.get('urlserveur').then(async (val) => {
			      if (val != "") {
			        this.voyageapi.supprimevoyage(val, obj)
			          .subscribe(res => {
			          	console.log(res)
			            loading.dismiss();
						alertsucces.present();
			          }, (err) => {
			            loading.dismiss();
			            alertf.present();
			        });
			      }
			      else{
			        await loading.dismiss();
			        await alertf.present();
			      }
			    });
		      }
		    }
		  ]
		});
		await alert.present();
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
