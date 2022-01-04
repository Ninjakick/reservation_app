import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
	constructor(private http: HttpClient,private storage: Storage) {
	}
	private handleError(error: HttpErrorResponse) {
	    if (error.error instanceof ErrorEvent) { 
	      console.error('An error occurred:', error.error.message);
	    } else {
	      console.error(
	        `Backend returned code ${error.status}, ` +
	        `body was: ${error.error}`);
	      console.log(error.error)
	    }
	    return throwError('Something bad happened; please try again later.');
	}
	private extractData(res: Response) {
	    let body = res;
	    return body || { };
	}
	getlistutilisateur(urlserv): Observable<any> {
	    const url =  `${urlserv}/Utilisateur_controller/getlistutilisateur`;
	    return this.http.get(url, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	suppreclient(urlserv, data ): Observable<any> {
	    const url =  `${urlserv}/Utilisateur_controller/deleteclient`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	editclient(data, urlserv): Observable<any> {
	    const url =  `${urlserv}/Utilisateur_controller/editclient`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	nouveaucoperative(data, urlserv): Observable<any> {
	    const url =  `${urlserv}/Utilisateur_controller/nouveaucoperative`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	editcoperative(data, urlserv): Observable<any> {
	    const url =  `${urlserv}/Utilisateur_controller/editcoperative`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	suppreuser(urlserv, data ): Observable<any> {
	    const url =  `${urlserv}/Utilisateur_controller/deleteuser`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	getlistclient(urlserv): Observable<any> {
	    const url =  `${urlserv}/Utilisateur_controller/getlistclient`;
	    return this.http.get(url, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
}
