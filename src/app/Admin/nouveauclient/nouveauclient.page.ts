import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ModalController, NavParams } from '@ionic/angular';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { LoginService } from '../../api/login.service';
import { UtilisateurService } from '../../api/admin/utilisateur.service';

@Component({
  selector: 'app-nouveauclient',
  templateUrl: './nouveauclient.page.html',
  styleUrls: ['./nouveauclient.page.scss'],
})
export class NouveauclientPage implements OnInit {
	titrepage = "";
	boutonlabel = "";
	userinfo: FormGroup;
	constructor(
		public loadingController: LoadingController,
	    private formBuilder: FormBuilder,
	    public alertController: AlertController,
	    private storage: Storage,
	    public loginapi: LoginService,
	    public modalController: ModalController,
	    public utilisateurapi: UtilisateurService,
	    public navParams: NavParams,
	) {
		var type = this.navParams.get('type');
		if (type == "edit") {
			var datanav = JSON.parse(this.navParams.get('data'));
			this.userinfo = this.formBuilder.group({
		        'nom' : [datanav.nom, Validators.required],
		        'prenom' : [datanav.prenom, Validators.required],
		        'numero' : [datanav.numero, Validators.required],
		        'adress' : [datanav.adresse, Validators.required],
		        'date_naissance' : [datanav.date_naissance, Validators.required],
		        'mdp' : [datanav.mdp, Validators.required],
		        'mdpconfirm' : [datanav.mdp, Validators.required],
		        'id': datanav.id
		    });
		    this.titrepage = "Modification Client";
			this.boutonlabel = "Mettre à jour";
		}
		else{
			this.userinfo = this.formBuilder.group({
		        'nom' : [null, Validators.required],
		        'prenom' : [null, Validators.required],
		        'numero' : [null, Validators.required],
		        'adress' : [null, Validators.required],
		        'date_naissance' : [null, Validators.required],
		        'mdp' : [null, Validators.required],
		        'mdpconfirm' : [null, Validators.required],
		    });
		    this.titrepage = "Insertion Client";
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
						await this.loginapi.inscription(this.userinfo.value, val)
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
						await this.utilisateurapi.editclient(this.userinfo.value, val)
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
