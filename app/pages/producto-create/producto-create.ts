import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
//import {RendicionPage} from '../rendicion/rendicion';
import {ProductosPage} from '../productos/productos';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {ProductService} from './../../services/ProductService';
import {Producto} from '../../models/Producto';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, AbstractControl} from '@angular/forms';

@Component({
	templateUrl: 'build/pages/producto-create/producto-create.html',
  	directives: REACTIVE_FORM_DIRECTIVES
})
export class ProductoCreatePage {
	authForm: FormGroup;
	denominacion: AbstractControl;
	precio: AbstractControl;
	productos: Array<Producto> = [];

	constructor(private navCtrl: NavController, private loading: LoadingController, private productServ: ProductService, private http: ExtendedHttp, private params: NavParams) {
		this.productos = this.params.get('productos');
		this.authForm = new FormGroup({
	      denominacion: new FormControl(''),
	      precio: new FormControl('')
	    });
	    this.denominacion = this.authForm.controls['denominacion'];
	    this.precio = this.authForm.controls['precio'];
	}

	crearProducto() {
		event.defaultPrevented;
		this.productos.push(new Producto(this.denominacion.value,this.precio.value));
		this.productServ.setProducts(this.productos);
		this.navCtrl.push(ProductosPage);
	}
}