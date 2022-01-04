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
export class TarifService {

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
	getlisttarif(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/getlisttarif`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	ajouttarif(data, urlserv): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/ajouttarif`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	edittarif(data, urlserv): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/edittarif`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	supprimetarif(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/supprimetarif`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
}
