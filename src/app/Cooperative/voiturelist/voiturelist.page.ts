import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ModalController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { VoitureService } from '../../api/cooperative/voiture.service';

import { NouvelvoiturePage } from '../nouvelvoiture/nouvelvoiture.page';

@Component({
  selector: 'app-voiturelist',
  templateUrl: './voiturelist.page.html',
  styleUrls: ['./voiturelist.page.scss'],
})
export class VoiturelistPage implements OnInit {

	public donnevoiture : any;
	public donnevoitureinitial : any;
	constructor(public loadingController: LoadingController,public alertController: AlertController, public voitureapi: VoitureService,private storage: Storage, public modalController: ModalController) {
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
			        await this.voitureapi.getlistvoiture(val, obj)
			          .subscribe(res => {
			            loading.dismiss();
			            this.donnevoiture = res.voiture;
			            this.donnevoitureinitial = res.voiture;
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
	      component: NouvelvoiturePage
	    });
	    await modal.present();
	    var { data } = await modal.onWillDismiss();
		if (data.dismissed) {
			this.loaddata();
		}
  }
  SearchinputChanged(event){
		this.donnevoiture = this.donnevoitureinitial;
		this.donnevoiture = this.donnevoiture.filter(client=>{
			if (client.marque.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.numero.toLowerCase().indexOf(event.toLowerCase()) != -1 ) {
				return true
			}
			else{
				return false
			}
		})
  }
  async editvoiture(data){
  	var modal = await this.modalController.create({
    	component: NouvelvoiturePage,
    	componentProps: {
    		"type": "edit",
    		"data": JSON.stringify(data)
    	}
    });
    await modal.present();
    await modal.onWillDismiss();
	this.loaddata();
  }
  async supprimevoiture(id){
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
		      	console.log(obj)
		        this.voitureapi.supprimevoiture(val, obj)
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
