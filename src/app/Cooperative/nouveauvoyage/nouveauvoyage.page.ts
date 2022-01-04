import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController, ModalController, NavParams } from '@ionic/angular';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { VoyageService } from '../../api/cooperative/voyage.service';

@Component({
  selector: 'app-nouveauvoyage',
  templateUrl: './nouveauvoyage.page.html',
  styleUrls: ['./nouveauvoyage.page.scss'],
})
export class NouveauvoyagePage implements OnInit {
	titrepage = "";
	boutonlabel = "";
	voyageinputgroup: FormGroup;
	voiturelist : any;
	tariflist : any;
	listdepart : any;
	listarriver :  any;
	constructor(
		public loadingController: LoadingController,
	    private formBuilder: FormBuilder,
	    public alertController: AlertController,
	    private storage: Storage,
	    public modalController: ModalController,
	    public navParams: NavParams,
	    public voyageapi: VoyageService,
	) {
		this.loaddata();
	}

	ngOnInit() {
		
	}
	async dismissModal(){
		this.modalController.dismiss({
	      'dismissed': true
	    });
	}
	async loaddata(){
		var type = this.navParams.get('type');
		if (type == "edit") {
			var datanav = JSON.parse(this.navParams.get('data'));
			this.voyageinputgroup = await this.formBuilder.group({
		        'id_voiture' : [datanav.id_voiture, Validators.required],
		        'id_tarif' : [datanav.id_tarif],
		        'lieu_depart' : [datanav.lieu_depart, Validators.required],
				'lieu_arrive' : [datanav.lieu_arrive, Validators.required],
				'montant': [datanav.montant, Validators.required],
		        'date_dep' : [datanav.date_dep, Validators.required],
		        'date_arr' : [datanav.date_arr, Validators.required],
		        'id': datanav.id
		    });
		    this.titrepage = "Modification";
			this.boutonlabel = "Mettre à jour";
		}
		else{
			await this.storage.get('id_cooperative').then(async (id) => {
	      		if (id != "") {
	      			this.voyageinputgroup = await this.formBuilder.group({
				        'id_voiture' : [null, Validators.required],
				        'id_tarif' : [null],
				        'lieu_depart' : [null, Validators.required],
				        'lieu_arrive' : [null, Validators.required],
				        'date_dep' : [null, Validators.required],
				        'id_cooperative' : id,
				        'montant': "",
				        'date_arr': [null, Validators.required]
				    });
				    this.titrepage = "Insertion";
					this.boutonlabel = "Enregister";
			    }
			});
		}
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
			        await this.voyageapi.getdataforvoyage(val, obj)
			          .subscribe(res => {
			            loading.dismiss();
			            this.voiturelist = res.voiture;
			            this.tariflist = res.tarif;
			            var listdepart = [];
			            var listarriver = [];
			            for (var i = 0; i < this.tariflist.length; i++) {
					        listdepart.push(this.tariflist[i].lieu_depart);
					        listarriver.push(this.tariflist[i].lieu_arrive);
					    }
					    listdepart = listdepart.filter(function(item, pos, self) {
					        return self.indexOf(item) == pos;
					    })
					    listarriver = listarriver.filter(function(item, pos, self) {
					        return self.indexOf(item) == pos;
					    })
					    this.listdepart = listdepart;
					    this.listarriver = listarriver;
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
  			message: 'Voyage enregistrer avec success',
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
					await this.voyageapi.ajoutvoyage(val, this.voyageinputgroup.value)
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
					await this.voyageapi.editvoyage(val, this.voyageinputgroup.value)
				    .subscribe(async res => {
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
	async chagementvaleurdepart(){
		if (this.voyageinputgroup.value.lieu_arrive != null) {
			this.voyageinputgroup.value.lieu_arrive == null;
		}
        var listarriver = [];
        var key = this.voyageinputgroup.value.lieu_depart
        var leur = this.tariflist.filter(function(item) {
	        if (item.lieu_depart == key) {
	        	return true
	        }
	        else{
	        	return false
	        }
	    })
        for (var i = 0; i < leur.length; i++) {
	        listarriver.push(leur[i].lieu_arrive);
	    }
	    listarriver = listarriver.filter(function(item, pos, self) {
	        return self.indexOf(item) == pos;
	    })
	    this.voyageinputgroup.value.id_tarif = null;
	    this.listarriver = listarriver;
	}
	async chagementvaleurarriver(){
		var alertf = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Veuillez selectionner le lieu de depart s\'il vous plais',
			buttons: ['Ok']
	    });
	    var key = this.voyageinputgroup.value.lieu_depart;
	    var key2 = this.voyageinputgroup.value.lieu_arrive;
	    if (this.voyageinputgroup.value.lieu_depart == null) {
	    	await alertf.present();
	    }
	    else{
	    	var listarriver = [];
	        var leur = this.tariflist.filter(function(item) {
		        if (item.lieu_depart == key && item.lieu_arrive == key2) {
		        	return true
		        }
		        else{
		        	return false
		        }
		    })
	        this.voyageinputgroup.value.montant = parseInt(leur[0].montant)+" Ar";
	        this.voyageinputgroup.value.id_tarif = leur[0].id;
	        console.log(this.voyageinputgroup.value)
	    }
		
	}
	async focusfun(){
		var alertf = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Veuillez selectionner le lieu de depart s\'il vous plais',
			buttons: ['Ok']
	    });
	    if (this.voyageinputgroup.value.lieu_depart == null) {
	    	await alertf.present();
	    }
	}
}
