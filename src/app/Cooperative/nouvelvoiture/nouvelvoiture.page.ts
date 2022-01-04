import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ModalController, NavParams } from '@ionic/angular';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { VoitureService } from '../../api/cooperative/voiture.service';

@Component({
  selector: 'app-nouvelvoiture',
  templateUrl: './nouvelvoiture.page.html',
  styleUrls: ['./nouvelvoiture.page.scss'],
})
export class NouvelvoiturePage implements OnInit {

  titrepage = "";
	boutonlabel = "";
	voitureinfo: FormGroup;
  constructor(
		public loadingController: LoadingController,
	    private formBuilder: FormBuilder,
	    public alertController: AlertController,
	    private storage: Storage,
	    public modalController: ModalController,
	    public voitureapi: VoitureService,
	    public navParams: NavParams,
	) {
  		var type = this.navParams.get('type');
		if (type == "edit") {
			var datanav = JSON.parse(this.navParams.get('data'));
			this.voitureinfo = this.formBuilder.group({
		        'marque' : [datanav.marque, Validators.required],
		        'numero' : [datanav.numero, Validators.required],
		        'nombre_place' : [datanav.nombre_place, Validators.required],
		        'id_cooperative' : datanav.id_cooperative,
		        'id': datanav.id
		    });
		    this.titrepage = "Modification Voiture";
			this.boutonlabel = "Mettre à jour";
		}
		else{
			this.storage.get('id_cooperative').then(async (id) => {
	      		if (id != "") {
	      			this.voitureinfo = this.formBuilder.group({
				        'marque' : [null, Validators.required],
				        'numero' : [null, Validators.required],
				        'nombre_place' : [null, Validators.required],
				        'id_cooperative' : id
				    });
				    this.titrepage = "Insertion Voiture";
					this.boutonlabel = "Enregister";
			    }
			});
			
		}
  }

  ngOnInit() {
  }

  async enregistre(){
		var loading = await this.loadingController.create({
	      message: 'Veuillez patienter... '
	    });
	    await loading.present();
	    var alertf = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Impossible de communiquer avec le serveur',
			buttons: ['Ok']
	    });
	    var alertsuccess = await this.alertController.create({
    		header: 'Enregistrement',
  			message: 'Voiture enregistrer avec success',
			buttons: [
				{
					text: 'Ok',
		        	handler: () => {
			          	this.modalController.dismiss({
					    	'dismissed': true
					    });
		        	}
		    	}
		    ]
	    });
  		await this.storage.get('urlserveur').then(async (val) => {
			if (val != "") {
				if (this.boutonlabel == "Enregister") {
					await this.voitureapi.ajoutvoiture(this.voitureinfo.value, val)
				    .subscribe(async res => {
				    	console.log(res)
				    	if (!res.error) {
				    		loading.dismiss();
				    		alertsuccess.present();
				    	}
				    	else{
				    		var alerterror = await this.alertController.create({
					    		header: 'Erreur!',
					  			message: res.message,
								buttons: ['Ok']
						    });
						    loading.dismiss();
				    		alerterror.present();
				    	}
				      }, (err) => {
				        loading.dismiss();
					    alertf.present();
				    });
				}
				else{
					await this.voitureapi.editvoiture(this.voitureinfo.value, val)
				    .subscribe(async res => {
				    	console.log(res)
				    	if (!res.error) {
				    		loading.dismiss();
				    		alertsuccess.present();
				    	}
				    	else{
				    		var alerterror = await this.alertController.create({
					    		header: 'Erreur!',
					  			message: res.message,
								buttons: ['Ok']
						    });
						    loading.dismiss();
				    		alerterror.present();
				    	}
				      }, (err) => {
				        loading.dismiss();
					    alertf.present();
				    });
				}
			}
			else{
				await loading.dismiss();
			    await alertf.present();
			}
		});
	}
	async dismissModal(){
		this.modalController.dismiss({
	      'dismissed': true
	    });
	}

}
