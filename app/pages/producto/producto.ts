import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {Producto} from '../../models/Producto';

@Component({
	templateUrl: 'build/pages/producto/producto.html'
})
export class ProductoPage {

	producto: Producto;

	constructor(private navCtrl: NavController, private loading: LoadingController,
		private params: NavParams, private http: ExtendedHttp) {

		if(this.params.get('producto')){
			this.producto = this.params.get('producto');
		}
		console.log(this.producto);
	}

	ngOnInit(){
		console.log("Despues del ngOnInit");
	}
}