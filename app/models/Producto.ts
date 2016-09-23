import {StorageUtils} from '../utils/StorageUtils';

export class Producto {
	
	private denominacion: string;
	private precio: number;

	constructor(denominacion: string, precio: number) {
		this.denominacion = denominacion;
		this.precio = precio;
	}

	public getPrecio():number{
		return this.precio;
	}

}