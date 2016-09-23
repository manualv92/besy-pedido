import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {ProductoCreatePage} from '../producto-create/producto-create';
import {PedidoPage} from '../pedido/pedido';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {PedidoService} from './../../services/PedidoService';
import {Pedido} from '../../models/Pedido';

@Component({
	templateUrl: 'build/pages/pedidos/pedidos.html'
})
export class PedidosPage {

	pedidos: Array<Pedido> = [];

	constructor(private navCtrl: NavController, private loading: LoadingController,
		private params: NavParams, private pedidoServ: PedidoService, private http: ExtendedHttp) {
		console.log(this.pedidos);
	}

	ngOnInit(){
		this.pedidoServ.getPedidos().subscribe( pedidos => {
			this.pedidos = pedidos;
		})
		console.log("Despues del ngOnInit");
		console.log(this.pedidos);
	}

	borrarPedido(pedido) {
		this.pedidos.splice(this.pedidos.indexOf(pedido),1);
		this.pedidoServ.setPedidos(this.pedidos);
	}
	goToPedidoCreate(pedido) {
		this.navCtrl.push(ProductoCreatePage,{
			pedidos: this.pedidos
		});
	}

	goToPedido(pedido){
		this.navCtrl.push(PedidoPage,{
			pedido: pedido
		})
	}
}