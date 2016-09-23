import {Component, Pipe, PipeTransform} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {ProductoCreatePage} from '../producto-create/producto-create';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {PedidoService} from './../../services/PedidoService';
import {ProductService} from './../../services/ProductService';
import {ItemFilter} from './../../pipes/ItemFilter';
import {Cliente} from '../../models/Cliente';
import {Producto} from '../../models/Producto';
import {Pedido} from '../../models/Pedido';



@Component({
	templateUrl: 'build/pages/pedido-create/pedido-create.html',
  	pipes: [ItemFilter]
})

export class PedidoCreatePage{

	filtroString: String = "";
	pedidos: Array<Pedido> = [];
	cliente: Cliente;
	productos: Array<Producto> = [];
	productosSeleccionados: Array<Producto> = [];
	productosModificados:Array<any> = [];

	constructor(private navCtrl: NavController, private loading: LoadingController,
	private params: NavParams, private pedidoServ: PedidoService, private productServ: ProductService, private http: ExtendedHttp) {
		
		this.cliente = this.params.get('cliente');
		console.log(this.cliente);
	}

	ngOnInit(){
		this.productServ.getProducts().subscribe( products => {
			this.productosModificados = [...products]
			this.productos = products;
			
			this.productosModificados.map( producto => producto.active = false )
			console.log(this.productosModificados)
		})
		this.pedidoServ.getPedidos().subscribe( pedidos => {
			this.pedidos = pedidos;
		})
		console.log("Despues del ngOnInit");
	}

	checkboxChange($event, producto){
		console.log(this.productosModificados);
		console.log(this.pedidos);
	}

	crearPedido(){
		this.productosModificados.forEach(item=>{if(item.active){this.productosSeleccionados.push(new Producto(item.denominacion,item.precio))}});
		this.pedidos.push(new Pedido(this.cliente,this.productosSeleccionados));
		console.log(this.pedidos);
		this.pedidoServ.setPedidos(this.pedidos);
		this.navCtrl.pop();
	}
}