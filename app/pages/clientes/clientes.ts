import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
//import {RendicionPage} from '../rendicion/rendicion';
import {ClienteCreatePage} from '../cliente-create/cliente-create';
import {PedidoCreatePage} from '../pedido-create/pedido-create';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {ClientService} from './../../services/ClientService';
import {Cliente} from '../../models/Cliente';

@Component({
	templateUrl: 'build/pages/clientes/clientes.html'
})
export class ClientesPage {

	clientes: Array<Cliente> = [];

	constructor(private navCtrl: NavController, private loading: LoadingController,
		private params: NavParams, private clientServ: ClientService, private http: ExtendedHttp) {

		if(this.params.get('cliente')){
			this.clientes.push(this.params.get('cliente'));
		}
		console.log(this.clientes);
	}

	ngOnInit(){
		this.clientServ.getClients().subscribe( clients => {
			//console.log(clients);
			this.clientes = clients;
		})

		//this.propertyService.findAll().then(data => this.properties = data);
		/*this.clientServ.getAllClients().then((clientes =>{
			//this.clientes = clientes;
			console.log("Dentro del then Clientes.ts")
			console.log(clientes);
		}));*/
			console.log("Despues del ngOnInit");
	}

	borrarCliente(cliente) {
		this.clientes.splice(this.clientes.indexOf(cliente),1);
		this.clientServ.setClients(this.clientes);
	}
	goToClienteCreate(cliente) {
		this.navCtrl.push(ClienteCreatePage,{
			clientes: this.clientes
		});
	}
	goToPedidoCreate(cliente) {
		this.navCtrl.push(PedidoCreatePage,{
			cliente: cliente
		});
	}
}