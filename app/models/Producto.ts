import {StorageUtils} from '../utils/StorageUtils';

export class Producto {
	
	private denominacion: string;
	private precio: string;

	constructor(denominacion: string, precio: string) {
		this.denominacion = denominacion;
		this.precio = precio;
	}

}