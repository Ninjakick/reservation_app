import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ModalController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { UtilisateurService } from '../../api/admin/utilisateur.service';

import { NouveauclientPage } from '../nouveauclient/nouveauclient.page';
import { NouveaucooperativePage } from '../nouveaucooperative/nouveaucooperative.page';
import { DetailclientPage } from '../detailclient/detailclient.page';
import { DetailcooperativePage } from '../detailcooperative/detailcooperative.page';

@Component({
  selector: 'app-utilisateurlist',
  templateUrl: './utilisateurlist.page.html',
  styleUrls: ['./utilisateurlist.page.scss'],
})
export class UtilisateurlistPage implements OnInit {
	public donneuser : any;
	public donneclient : any;
	public donneuserinitial : any;
	public donneclientinitial : any;
	active = "";

	constructor(public loadingController: LoadingController,public alertController: AlertController, public utilisateurapi: UtilisateurService,private storage: Storage, public modalController: ModalController) {
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
	        await this.utilisateurapi.getlistutilisateur(val)
	          .subscribe(res => {
	            loading.dismiss();
	            this.donneuser = res.user;
	            this.donneclient = res.client;
	            this.donneclientinitial = res.client;
	            this.donneuserinitial = res.user
	            if (this.active == "") {
	            	this.active = "client";
	            }
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
  segmentChanged(event){
  	this.active =  event.detail.value;
  }
  async detailClient(data){
  	if (this.active == "client") {
  		var modal = await this.modalController.create({
	      component: DetailclientPage,
	      componentProps: { data : JSON.stringify(data)}
	    });
	    return await modal.present();
  	}
  	else{
  		var modal = await this.modalController.create({
	      component: DetailcooperativePage,
	      componentProps: { data : JSON.stringify(data)}
	    });
	    return await modal.present();
  	}
  }
  async nouveau(){
  	if (this.active == "client") {
  		var modal = await this.modalController.create({
	      component: NouveauclientPage
	    });
	    await modal.present();
	    var { data } = await modal.onWillDismiss();
		if (data.dismissed) {
			this.loaddata();
		}
  	}
  	else{
  		var modal = await this.modalController.create({
	      component: NouveaucooperativePage
	    });
	    await modal.present();
	    var { data } = await modal.onWillDismiss();
		if (data.dismissed) {
			this.loaddata();
		}
  	}
  }
  async supprimeclient(id){
  	
    var obj = {id: id};
    var alertf = await this.alertController.create({
		header: 'Erreur!',
			message: 'Impossible de communiquer avec le serveur',
		buttons: ['Ok']
    });
   	var alertsucces = await this.alertController.create({
      message: 'Suppressiom de client effetuer avec success!',
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
      message: 'Vous êtes sur le point de supprimer le donne de ce client. Etes vous sûr de vouloir continuer?',
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
		        this.utilisateurapi.suppreclient(val, obj)
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
  async editclient(data){
  	var modal = await this.modalController.create({
    	component: NouveauclientPage,
    	componentProps: {
    		"type": "edit",
    		"data": JSON.stringify(data)
    	}
    });
    await modal.present();
    await modal.onWillDismiss();
	this.loaddata();
  }
  async editcooper(data){
  	var modal = await this.modalController.create({
    	component: NouveaucooperativePage,
    	componentProps: {
    		"type": "edit",
    		"data": JSON.stringify(data)
    	}
    });
    await modal.present();
    await modal.onWillDismiss();
	this.loaddata();
  }
  SearchinputChanged(event){
  	if (this.active == "client") {
  		this.donneclient = this.donneclientinitial;
  		this.donneclient = this.donneclient.filter(client=>{
  			if (client.nom.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.prenom.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.numero.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.adresse.toLowerCase().indexOf(event.toLowerCase()) != -1) {
				return true
			}
			else{
				return false
			}
  		})
  	}
  	else{
  		this.donneuser = this.donneuserinitial;
  		this.donneuser = this.donneuser.filter(client=>{
  			if (client.nom.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.type.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.login.toLowerCase().indexOf(event.toLowerCase()) != -1 || client.adresse.toLowerCase().indexOf(event.toLowerCase()) != -1) {
				return true
			}
			else{
				return false
			}
  		})
  	}
  }
  async supprime(id, id_cooperative){
  	var obj = {id: id, id_cooperative: id_cooperative};
    var alertf = await this.alertController.create({
		header: 'Erreur!',
			message: 'Impossible de communiquer avec le serveur',
		buttons: ['Ok']
    });
   	var alertsucces = await this.alertController.create({
      message: 'Suppressiom d\'utilisateur effetuer avec success!',
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
      message: 'Vous êtes sur le point de supprimer le donne de cet utilisateur. Etes vous sûr de vouloir continuer?',
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
		        this.utilisateurapi.suppreuser(val, obj)
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
