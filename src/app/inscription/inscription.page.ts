import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { LoginService } from '../api/login.service';
 
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
	userinfo: FormGroup;
	constructor(
		public loadingController: LoadingController,
	    private route: ActivatedRoute,
	    public router: Router,
	    private formBuilder: FormBuilder,
	    public alertController: AlertController,
	    private storage: Storage,
	    public loginapi: LoginService
	) {
		this.userinfo = this.formBuilder.group({
	        'nom' : [null, Validators.required],
	        'prenom' : [null, Validators.required],
	        'numero' : [null, Validators.required],
	        'adress' : [null, Validators.required],
	        'date_naissance' : [null, Validators.required],
	        'mdp' : [null, Validators.required],
	        'mdpconfirm' : [null, Validators.required],
	    });
	}

	ngOnInit() {
	}
	async login(){
		this.router.navigate(['home']);
	}
	async enregistre(){
		const loading = await this.loadingController.create({
	      message: 'Veuillez patienter... '
	    });
	    await loading.present();
	    const alert = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Les mots de passe ne correspond pas',
			buttons: ['Ok']
	    });
	    const alertf = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Impossible de communiquer avec le serveur',
			buttons: ['Ok']
	    });
	    const alertsuccess = await this.alertController.create({
    		header: 'Bienvenu sur notre plateforme',
  			message: 'Pour vous connectez, veuillez cliqué sur le buttons se connectez. Merci pour votre confience',
			buttons: ['Ok']
	    });
	    if (this.userinfo.value.mdp != this.userinfo.value.mdpconfirm) {
	  		await loading.dismiss();
		    await alert.present();
	  	}
	  	else{
	  		await this.storage.get('urlserveur').then(async (val) => {
				if (val != "") {
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
					await loading.dismiss();
				    await alertf.present();
				}
			});
	  	}
	}
}
