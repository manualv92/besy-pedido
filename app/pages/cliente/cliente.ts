import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {ClientService} from './../../services/ClientService';
import {Cliente} from '../../models/Cliente';

@Component({
	templateUrl: 'build/pages/cliente/cliente.html'
})
export class ClientePage {

	cliente: Cliente;

	constructor(private navCtrl: NavController, private loading: LoadingController,
		private params: NavParams, private clientServ: ClientService, private http: ExtendedHttp) {

		if(this.params.get('cliente')){
			this.cliente = this.params.get('cliente');
		}
		console.log(this.cliente);
	}

	ngOnInit(){
		console.log("Despues del ngOnInit");
	}
}