import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
//import {RendicionPage} from '../rendicion/rendicion';
import {ProductoCreatePage} from '../producto-create/producto-create';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {ProductService} from './../../services/ProductService';
import {ItemFilter} from './../../pipes/ItemFilter';
import {Producto} from '../../models/Producto';

@Component({
	templateUrl: 'build/pages/productos/productos.html',
	pipes: [ItemFilter]
})
export class ProductosPage {

	filtroString: String = "";
	productos: Array<Producto> = [];

	constructor(private navCtrl: NavController, private loading: LoadingController,
		private params: NavParams, private productServ: ProductService, private http: ExtendedHttp) {

		if(this.params.get('producto')){
			this.productos.push(this.params.get('producto'));
		}
		console.log(this.productos);
	}

	ngOnInit(){
		this.productServ.getProducts().subscribe( products => {
			this.productos = products;
		})
		console.log("Despues del ngOnInit");
	}

	borrarProducto(producto) {
		this.productos.splice(this.productos.indexOf(producto),1);
		this.productServ.setProducts(this.productos);
	}
	goToProductoCreate(producto) {
		this.navCtrl.push(ProductoCreatePage,{
			productos: this.productos
		});
	}
}