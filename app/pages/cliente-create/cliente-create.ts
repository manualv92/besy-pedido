import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
//import {RendicionPage} from '../rendicion/rendicion';
import {ClientesPage} from '../clientes/clientes';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {ClientService} from './../../services/ClientService';
import {Cliente} from '../../models/Cliente';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, AbstractControl} from '@angular/forms';

@Component({
	templateUrl: 'build/pages/cliente-create/cliente-create.html',
  	directives: REACTIVE_FORM_DIRECTIVES
})
export class ClienteCreatePage {
	authForm: FormGroup;
	nombre: AbstractControl;
	apellido: AbstractControl;
	domicilio: AbstractControl;
	empresa: AbstractControl;
	clientes: Array<Cliente> = [];

	constructor(private navCtrl: NavController, private loading: LoadingController, private clientServ: ClientService, private http: ExtendedHttp, private params: NavParams) {
		this.clientes = this.params.get('clientes');
		this.authForm = new FormGroup({
	      nombre: new FormControl(''),
	      apellido: new FormControl(''),
	      domicilio: new FormControl(''),
	      empresa: new FormControl('')
	    });
	    this.nombre = this.authForm.controls['nombre'];
	    this.apellido = this.authForm.controls['apellido'];
	    this.domicilio = this.authForm.controls['domicilio'];
	    this.empresa = this.authForm.controls['empresa'];
	}

	crearCliente() {
		event.defaultPrevented;
		this.clientes.push(new Cliente(this.nombre.value,this.apellido.value,this.domicilio.value,this.empresa.value));
		this.clientServ.setClients(this.clientes);
		this.navCtrl.push(ClientesPage);
	}
}