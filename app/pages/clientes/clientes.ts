import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
//import {RendicionPage} from '../rendicion/rendicion';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {UserService} from './../../services/UserService';
import {Cliente} from '../../models/Cliente';

@Component({
	templateUrl: 'build/pages/clientes/clientes.html'
})
export class ClientesPage {

	clientes: Array<Cliente> = [];
	processes: any;

	constructor(
		private navCtrl: NavController,
		private loading: LoadingController,
		private user: UserService,
		private http: ExtendedHttp) {

		this.clientes.push(new Cliente("Manuel","Alvarez","Pilar","Besysoft"));
		this.clientes.push(new Cliente("Leonardo","Zielinski","Pilar","Besysoft"));
		this.clientes.push(new Cliente("Diego","Medina","Moreno","Besysoft"));
		this.clientes.push(new Cliente("Mariano","Lista","Pilar","Besysoft"));

		console.log(this.clientes);
	}

	borrarCliente(cliente) {
		this.clientes.splice(this.clientes.indexOf(cliente),1);
	}
	/*goToClienteDetalle(cliente) {
		this.navCtrl.push(RendicionPage, {
			cliente: cliente
		});
	}*/
}