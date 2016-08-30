import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {StorageUtils} from './../utils/StorageUtils';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
//const BACKEND_URL:string = 'http://localhost:9090';
const BACKEND_URL:string = 'http://paralelo.besysoft.com:7901/RendicionGastos-1.0';

@Injectable()
export class ExtendedHttp {

	private header = new Headers();

	constructor(private http: Http) {
		this.http = http;
		this.header.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);
	}

	intercept(observable: Observable<Response>): Observable<Response> {
		return observable.catch((err, source) => {
			console.log(err);
			return Observable.throw(err);
		})
	}

	// add token header
	private createAuthorizationHeader() {
		this.header.set('authorization', StorageUtils.getToken());
	}

	public get(url: string):Observable<Response> {
		this.createAuthorizationHeader();
		return this.intercept(this.http.get(BACKEND_URL + url, {headers: this.header}));
	}
/*
	public get(url: string):Observable<Response> {
		this.createAuthorizationHeader();
		return this.http.get(BACKEND_URL + url, {headers: this.header});
	}
*/
	public post(resource: string, data: any, auth: boolean = false):Observable<Response> {
		if (!auth) 
			this.createAuthorizationHeader();
		return this.intercept(this.http.post(BACKEND_URL + resource, JSON.stringify(data), {headers: this.header}));
	}
}