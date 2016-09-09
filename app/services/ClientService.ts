import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {AlertController} from 'ionic-angular';
import 'rxjs/Rx';
import {ExtendedHttp} from './ExtendedHttp';
import {Cliente} from '../models/Cliente';


//

import {Storage, LocalStorage} from 'ionic-angular';

//

@Injectable()
export class ClientService {

	clientes: Array<Cliente> = [];
	local: any;

	constructor(private http: ExtendedHttp, private alert: AlertController) {
		this.http = http;
	}

	public getClients():Observable<any>{
		this.local = new Storage(LocalStorage);

		return Observable.create( (observer:any) => {
			this.local.get('clientes').then( clients => {
				console.log(clients)
				if(clients == null) {
					this.clientes.push(new Cliente("Manuel","Alvarez","Pilar","Besysoft"));
					this.clientes.push(new Cliente("Leonardo","Zielinski","Pilar","Besysoft"));
					this.clientes.push(new Cliente("Diego","Medina","Moreno","Besysoft"));
					this.clientes.push(new Cliente("Mariano","Lista","Pilar","Besysoft"));
					console.log(JSON.stringify(this.clientes))
					this.local.set('clientes' ,  JSON.stringify(this.clientes));
					clients = this.clientes
				} 
				observer.next(JSON.parse(clients))
				observer.complete()
			})
		});
	}

	public createClient(client:Cliente){
		this.local = new Storage(LocalStorage);

		/*console.log(client);
		this.local = new Storage(LocalStorage);
		this.local.get('clientes').then( clients => {
			console.log(clients)
			console.log(JSON.stringify(this.clientes))
			this.local.set('clientes' ,  JSON.stringify(this.clientes));
			clients = this.clientes;
		})
		//this.local.get('clientes').then((clientes)=>{
		//	this.clientes = clientes;
		//});
		this.clientes.push(client);
		this.local.set('clientes', this.clientes);*/
	}

	public setClients(clients:Array<Cliente>){
		this.local = new Storage(LocalStorage);
		this.local.set('clientes', JSON.stringify(clients));
	}
}