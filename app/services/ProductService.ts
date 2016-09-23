import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {AlertController} from 'ionic-angular';
import 'rxjs/Rx';
import {ExtendedHttp} from './ExtendedHttp';
import {Producto} from '../models/Producto';
import {Storage, LocalStorage} from 'ionic-angular';

@Injectable()
export class ProductService {

	productos: Array<Producto> = [];
	local: any;

	constructor(private http: ExtendedHttp, private alert: AlertController) {
		this.http = http;
	}

	public getProducts():Observable<any>{
		this.local = new Storage(LocalStorage);

		return Observable.create( (observer:any) => {
			this.local.get('products').then( products => {
				console.log(products)
				if(products == null) {
					this.productos.push(new Producto("Lapicera",10));
					this.productos.push(new Producto("Boligoma",20));
					this.productos.push(new Producto("Lapices de color",40));
					this.productos.push(new Producto("Resma A4",100));
					console.log(JSON.stringify(this.productos))
					this.local.set('products' ,  JSON.stringify(this.productos));
					products = JSON.stringify(this.productos);
				} 
				observer.next(JSON.parse(products))
				observer.complete()
			})
		});
	}

	public setProducts(products:Array<Producto>){
		this.local = new Storage(LocalStorage);
		this.local.set('products', JSON.stringify(products));
	}
}