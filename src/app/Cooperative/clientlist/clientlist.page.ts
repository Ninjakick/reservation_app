import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ModalController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

import { UtilisateurService } from '../../api/admin/utilisateur.service';

import { ClientdetailcooperativePage } from '../clientdetailcooperative/clientdetailcooperative.page';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.page.html',
  styleUrls: ['./clientlist.page.scss'],
})
export class ClientlistPage implements OnInit {
	public donneclient : any;
	public donneclientinitial : any;

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
	        await this.utilisateurapi.getlistclient(val)
	          .subscribe(res => {
	            loading.dismiss();
	            this.donneclient = res.client;
	            this.donneclientinitial = res.client;
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
	async detailClient(data){
  		var modal = await this.modalController.create({
	      component: ClientdetailcooperativePage,
	      componentProps: { data : JSON.stringify(data)}
	    });
	    return await modal.present();
	}
	SearchinputChanged(event){
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
}
