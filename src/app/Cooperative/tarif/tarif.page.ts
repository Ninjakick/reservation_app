import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ModalController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { TarifService } from '../../api/cooperative/tarif.service';

import { NouveltarifPage } from '../nouveltarif/nouveltarif.page';

@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.page.html',
  styleUrls: ['./tarif.page.scss'],
})
export class TarifPage implements OnInit {

	public donnetarif : any;
	public donnetarifinitial : any;
	constructor(public loadingController: LoadingController,public alertController: AlertController, public tarifapi: TarifService,private storage: Storage, public modalController: ModalController) {
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
			        await this.tarifapi.getlisttarif(val, obj)
			          .subscribe(res => {
			            loading.dismiss();
			            this.donnetarif = res.tarif;
			            this.donnetarifinitial = res.tarif;
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
	      component: NouveltarifPage
	    });
	    await modal.present();
	    var { data } = await modal.onWillDismiss();
		if (data.dismissed) {
			this.loaddata();
		}
  }
  SearchinputChanged(event){
		this.donnetarif = this.donnetarifinitial;
		this.donnetarif = this.donnetarif.filter(client=>{
			if (client.lieu_depart.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.lieu_arrive.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.montant.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.montant.toLowerCase().indexOf(event.toLowerCase()) != -1) {
				return true
			}
			else{
				return false
			}
		})
  }
  async edittarif(data){
  	var modal = await this.modalController.create({
    	component: NouveltarifPage,
    	componentProps: {
    		"type": "edit",
    		"data": JSON.stringify(data)
    	}
    });
    await modal.present();
    await modal.onWillDismiss();
	this.loaddata();
  }
  async supprimetarif(id){
  	var obj = {id: id};
    var alertf = await this.alertController.create({
		header: 'Erreur!',
			message: 'Impossible de communiquer avec le serveur',
		buttons: ['Ok']
    });
   	var alertsucces = await this.alertController.create({
      message: 'Suppressiom du tarif effetuer avec success!',
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
      message: 'Vous êtes sur le point de supprimer ce tarif. Etes vous sûr de vouloir continuer?',
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
		      	console.log(obj)
		        this.tarifapi.supprimetarif(val, obj)
		          .subscribe(res => {
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
}
