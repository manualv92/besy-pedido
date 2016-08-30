import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {Alert} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import 'rxjs/Rx';
import {ExtendedHttp} from './ExtendedHttp';
import {User} from '../models/User';

@Injectable()
export class UserService {

	user: User = null;
	isLoged = false;
	constructor(private http: ExtendedHttp, private alert: AlertController) {
		this.http = http;
	}

	public authenticate(username: string, password: string):Observable<boolean> {
		return this.http.post('/api/auth', {'username': username, 'password': password}, true)
		.map((res) => {
			let resData:any = res.json();
			this.user = new User(username, password, resData.token);
			return true;
		}).catch((err:any) => {
			let error : string = err.status.toString();
			let res:any;
			switch (error) {
				case '503':
					res = {
						title: 'Servicio no disponible.',
						subTitle: 'El servicio no se encuentra disponible, contacte al administrador.',
						buttons: ['Ok']
					}
					break;
				case '403':
					res = {
						title: 'Credenciales invalidas.',
						subTitle: 'El usuario y contraseña ingresado no son correctos.',
						buttons: ['Ok']
					}
					break;
				default:
					res = {
						title: 'Error.',
						subTitle: 'Respuesta inesperada.',
						buttons: ['Ok']
					}
				}
				let alert = this.alert.create(res);
				return Observable.throw(alert);
			});
	}

	public getCurrentUser():Observable<User> {
		return Observable.create((observer:any) => {
			observer.next(this.user);
			observer.complete();
		});
	}

	public logout() {
		this.user.logout();
		this.user = null;
	}

	loginPromise() {
		return new Promise(resolve => {
			setTimeout(() => {
				console.log('time out');
				resolve(true);
			}, 1000)
		})
	}


	loginObservable():Observable<any> {
		return new Observable(observer => {
			setTimeout(() => {
				observer.next(true);
				observer.complete();
			}, 1000);
		})
	}
}