import {StorageUtils} from '../utils/StorageUtils';
import {Cliente} from './Cliente'
import {Producto} from './Producto'

export class Pedido {
	
	private cliente: Cliente;
	private productos: Array<Producto>;
	private montoTotal: number;

	constructor(cliente:Cliente, productos:Array<Producto>) {
		this.cliente = cliente;
		this.productos = productos;
		this.montoTotal = productos.reduce((total, producto) => total + producto.getPrecio(),0);
		console.log(this.montoTotal);
	}
}