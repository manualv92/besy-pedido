import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {AlertController} from 'ionic-angular';
import 'rxjs/Rx';
import {ExtendedHttp} from './ExtendedHttp';
import {Pedido} from '../models/Pedido';
import {Cliente} from '../models/Cliente';
import {Producto} from '../models/Producto';


//

import {Storage, LocalStorage} from 'ionic-angular';

//

@Injectable()
export class PedidoService {

	pedidos: Array<Pedido> = [];
	local: any;

	constructor(private http: ExtendedHttp, private alert: AlertController) {
		this.http = http;
	}

	public getPedidos():Observable<any>{
		this.local = new Storage(LocalStorage);

		return Observable.create( (observer:any) => {
			this.local.get('pedidos').then( pedidos => {
				console.log(pedidos)
				if(pedidos == null) {
					this.pedidos.push(new Pedido(new Cliente("Manuel","Alvarez","Pilar","Besysoft"),[new Producto("Boligoma",20), new Producto("Lapicera",10)]));
					this.pedidos.push(new Pedido(new Cliente("Manuel","Alvarez","Pilar","Besysoft"),[new Producto("Lapicera",10), new Producto("Boligoma",20)]));
					this.pedidos.push(new Pedido(new Cliente("Manuel","Alvarez","Pilar","Besysoft"),[new Producto("Lapicera",10), new Producto("Lapices de color",40)]));
					this.pedidos.push(new Pedido(new Cliente("Manuel","Alvarez","Pilar","Besysoft"),[new Producto("Resma A4",100), new Producto("Lapices de color",40)]));
					console.log(JSON.stringify(this.pedidos))
					this.local.set('pedidos' ,  JSON.stringify(this.pedidos));
					pedidos = JSON.stringify(this.pedidos);
				}
				observer.next(JSON.parse(pedidos))
				observer.complete()
			})
		});
	}

	public setPedidos(pedidos:Array<Pedido>){
		this.local = new Storage(LocalStorage);
		this.local.set('pedidos', JSON.stringify(pedidos));
	}
}