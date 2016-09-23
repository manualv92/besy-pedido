import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {ProductoCreatePage} from '../producto-create/producto-create';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {PedidoService} from './../../services/PedidoService';
import {Pedido} from '../../models/Pedido';

@Component({
	templateUrl: 'build/pages/pedido/pedido.html'
})
export class PedidoPage {

	pedido: Pedido;

	constructor(private navCtrl: NavController, private loading: LoadingController,
	private params: NavParams, private pedidoServ: PedidoService, private http: ExtendedHttp) {
		
		this.pedido = this.params.get('pedido');
		console.log(this.pedido);
	}
}