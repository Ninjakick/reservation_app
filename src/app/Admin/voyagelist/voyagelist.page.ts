import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ModalController } from '@ionic/angular';
 
import { Storage } from '@ionic/storage';

import { VoyageService } from '../../api/cooperative/voyage.service';

import { VoyagedetailadminPage } from '../voyagedetailadmin/voyagedetailadmin.page'; 

@Component({
  selector: 'app-voyagelist',
  templateUrl: './voyagelist.page.html',
  styleUrls: ['./voyagelist.page.scss'],
})
export class VoyagelistPage implements OnInit {

  public donnevoyage : any;
	public donnevoyageinitial : any;
	constructor(public loadingController: LoadingController,public alertController: AlertController, public voyageapi: VoyageService,private storage: Storage, public modalController: ModalController) {
		this.loaddata();
	}
	ngOnInit() {
	}
	async loaddata(){
	  	var loading = await this.loadingController.create({
	    	message: 'Veuillez patienter... '
	    });
	    await loading.present();
	    var alertf = await this.alertController.create({
	      header: 'Erreur!',
	      message: 'Impossible de communiquer avec le serveur',
	      buttons: ['Ok']
	    });
	  	await this.storage.get('urlserveur').then(async (val) => {
			if (val != ""){
		        await this.voyageapi.getlistvoyageaveccooperative(val)
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
	async opendetail(data){
		var loading = await this.loadingController.create({
	    	message: 'Veuillez patienter... '
	    });
	    await loading.present();
	    var alertf = await this.alertController.create({
	      header: 'Erreur!',
	      message: 'Impossible de communiquer avec le serveur',
	      buttons: ['Ok']
	    });
		await this.storage.get('urlserveur').then(async (val) => {
			if (val != ""){
				var obj = {id_voyage: data.id}
		        await this.voyageapi.getlistplace(val, obj)
		          .subscribe(async (res) => {
		            loading.dismiss();
		            var modal = await this.modalController.create({
				      component: VoyagedetailadminPage,
				      componentProps: { data : JSON.stringify(data), place: JSON.stringify(res.place)}
				    });
				    return await modal.present();
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
