import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavParams } from '@ionic/angular';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { Storage } from '@ionic/storage';

import { UtilisateurService } from '../../api/admin/utilisateur.service';

@Component({
  selector: 'app-nouveaucooperative',
  templateUrl: './nouveaucooperative.page.html',
  styleUrls: ['./nouveaucooperative.page.scss'],
})
export class NouveaucooperativePage implements OnInit {

  titrepage = "";
	boutonlabel = "";
	userinfo: FormGroup;
	constructor(
		public loadingController: LoadingController,
	    private formBuilder: FormBuilder,
	    public alertController: AlertController,
	    private storage: Storage,
	    public modalController: ModalController,
	    public utilisateurapi: UtilisateurService,
	    public navParams: NavParams,
	) {
		var type = this.navParams.get('type');
		if (type == "edit") {
			var datanav = JSON.parse(this.navParams.get('data'));
			this.userinfo = this.formBuilder.group({
		        'nom' : [datanav.nom, Validators.required],
		        'login' : [datanav.login, Validators.required],
		        'adress' : [datanav.adresse, Validators.required],
		        'type' : [datanav.type, Validators.required],
		        'mdp'  : [datanav.mdp, Validators.required],
		        'mdpconfirm' : [datanav.mdp, Validators.required],
		        'id': datanav.id,
		        'id_cooperative': datanav.id_cooperative,
		    });
		    this.titrepage = "Modification Cooperative";
			this.boutonlabel = "Mettre à jour";
		}
		else{
			this.userinfo = this.formBuilder.group({
		        'nom' : [null, Validators.required],
		        'login' : [null, Validators.required],
		        'adress' : [null, Validators.required],
		        'type' : [null, Validators.required],
		        'mdp' : [null, Validators.required],
		        'mdpconfirm' : [null, Validators.required],
		    });
		    this.titrepage = "Insertion Cooperative";
			this.boutonlabel = "Enregister";
		}
		
	}
	ngOnInit() {
	}
	async enregistre(){
		var loading = await this.loadingController.create({
	      message: 'Veuillez patienter... '
	    });
	    await loading.present();
	    var alert = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Les mots de passe ne correspond pas',
			buttons: ['Ok']
	    });
	    var alertf = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Impossible de communiquer avec le serveur',
			buttons: ['Ok']
	    });
	    var alertsuccess = await this.alertController.create({
    		header: 'Enregistrement',
  			message: 'Client enregistrer avec success',
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
	    if (this.userinfo.value.mdp != this.userinfo.value.mdpconfirm) {
	  		await loading.dismiss();
		    await alert.present();
	  	}
	  	else{
	  		await this.storage.get('urlserveur').then(async (val) => {
				if (val != "") {
					if (this.boutonlabel == "Enregister") {
						await this.utilisateurapi.nouveaucoperative(this.userinfo.value, val)
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
						await this.utilisateurapi.editcoperative(this.userinfo.value, val)
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
	}
	async dismissModal(){
		this.modalController.dismiss({
	      'dismissed': true
	    });
	}

}
