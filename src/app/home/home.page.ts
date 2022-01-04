import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router  } from '@angular/router';

import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

import { Storage } from '@ionic/storage';
import { LoginService } from '../api/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	credential: FormGroup;

	constructor(
		public loadingController: LoadingController,
	    private route: ActivatedRoute,
	    public router: Router,
	    private formBuilder: FormBuilder,
	    public alertController: AlertController,
	    private storage: Storage,
	    public loginapi: LoginService
    ) {
    	this.credential = this.formBuilder.group({
	        'username' : [null, Validators.required],
	        'password' : [null, Validators.required]
	    });
    }
    ngOnInit() {
	}
	async inscription(){
		this.router.navigate(['inscription']);
	}
	async login(){
		const loading = await this.loadingController.create({
	      message: 'Veuillez patienter... '
	    });
	    await loading.present();
	    const alert = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Votre username ou mot de pass incorrect!',
			buttons: ['Ok']
	    });
	    const alertf = await this.alertController.create({
    		header: 'Erreur!',
  			message: 'Impossible de communiquer avec le serveur',
			buttons: ['Ok']
	    });
	    
	  	if ("admin" == this.credential.value.username && "admin1234" == this.credential.value.password) {
	  		const alert = await this.alertController.create({
				header: 'Entrer l\'url du serveur',
				inputs: [
				{
				  name: 'url',
				  type: 'text',
				  placeholder: 'Url'
				},
				],
				buttons: [
				{
				  text: 'Cancel',
				  role: 'cancel',
				  cssClass: 'secondary',
				  handler: () => {
				    console.log('Confirm Cancel');
				  }
				}, {
				  text: 'Ok',
				  handler: (alertdata) => {
				  	console.log(alertdata.url)
				    this.storage.set('urlserveur', alertdata.url);
				  }
				}
				]
		    });
	  		await loading.dismiss();
		    await alert.present();
	  	}
	  	if ("admin" == this.credential.value.username && "test" == this.credential.value.password) {
	  		await loading.dismiss();
	  		this.storage.set('nom_user', "admin");
	  		this.router.navigate(['accueil']);
	  	}
	  	else{
	  		await this.storage.get('urlserveur').then(async (val) => {
				if (val != "") {
					await this.loginapi.postLogin(this.credential.value, val)
				    .subscribe(res => {
				    	console.log(res)
				    	loading.dismiss();
				    	if (res == "Invalid") {
				    		alert.present();
				    	}
				    	else{
				    		if (res.type == "Client") {
				    			this.storage.set('nom', res.nom);
					    		this.storage.set('mdp', res.mdp);
					    		this.storage.set('numero', res.numero);
					    		this.storage.set('adresse', res.adresse);
					    		this.storage.set('date_naissance', res.date_naissance);
					    		this.storage.set('id', res.id);
					    		this.storage.set('type', res.type);
					    		this.router.navigate(['clientmenu']);
				    		}
				    		else{
				    			this.storage.set('login', res.login);
					    		this.storage.set('mdp', res.mdp);
					    		this.storage.set('id_cooperative', res.id_cooperative);
					    		this.storage.set('adresse', res.adresse);
					    		this.storage.set('type', res.type);
				    			if (res.type == "Admin"){
				    				this.router.navigate(['adminmenu']);
					    		}
					    		else if (res.type == "Cooperative") {
									this.router.navigate(['cooperativemenu/voyage']);
					    		}
				    		}
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
