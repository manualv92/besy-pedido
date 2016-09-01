import {StorageUtils} from '../utils/StorageUtils';

export class Cliente {
	
	private nombre: string;
	private apellido: string;
	private direccion: string;
	private empresa: string;

	constructor(nombre:string, apellido:string, direccion:string, empresa:string) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.direccion = direccion;
		this.empresa = empresa;
	}

	logout() {
		StorageUtils.removeToken();
	}

}