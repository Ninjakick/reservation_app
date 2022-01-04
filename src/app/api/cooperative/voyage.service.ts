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
export class VoyageService {

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
	getlistvoyage(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/getlistvoyage`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	getlistvoyageaveccooperative(urlserv): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/getlistvoyageaveccooperative`;
	    return this.http.get(url, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	supprimevoyage(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/supprimevoyage`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	getdataforvoyage(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/getdataforvoyage`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	ajoutvoyage(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/ajoutvoyage`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	editvoyage(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/editvoyage`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	getlistplace(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/getlistplace`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
	sendreservation(urlserv, data): Observable<any> {
	    const url =  `${urlserv}/Cooperative_controller/sendreservation`;
	    return this.http.post(url, data, httpOptions)
	      .pipe(
	      	map(this.extractData),
	        catchError(this.handleError)
	      );
	}
}
