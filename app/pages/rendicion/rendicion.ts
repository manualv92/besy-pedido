import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {RechazoPage} from '../rechazo/rechazo';
import {UserService} from './../../services/UserService';
import {ExtendedHttp} from './../../services/ExtendedHttp';

@Component({
	templateUrl: 'build/pages/rendicion/rendicion.html'
})
export class RendicionPage {

	rendicion: any;

	evaluar = {
		resultado: 'aprobar',
		comentario: '',
		motivo: ''
	}

	constructor(
		private navCtrl: NavController,
		private loading: LoadingController,
		private params: NavParams,
		private user: UserService,
		private http: ExtendedHttp)
	{
		this.rendicion = this.params.get('rendicion');
		console.log(this.rendicion);
		//this.rendicion.gastos = [];
	}

	ionViewWillEnter() {
		/*let load = this.loading.create();
		load.present();

		this.http.get('/api/instance/' + this.rendicion.id).subscribe(
			res => this.rendicion.gastos = res.json().rendicion.gastos,
			err => console.log(err),
			() => load.dismiss()
		)*/
	}

	evaluate(event) {
		event.preventDefault();
		let load = this.loading.create();
		load.present();
		this.http.post('/api/instance/' + this.rendicion.id + '/evaluate', { "evaluar": this.evaluar }).subscribe(
			res => load.dismiss(),
			err => console.log(err),
			()  => this.popToRootFix()
		);
	}

	// workarround for ionic bugs in NavController - LoadingController
	private popToRootFix() {
		setTimeout(() => this.navCtrl.popToRoot(), 500)
	}

	goToRechazo() {
		this.navCtrl.push(RechazoPage, {
			rendicion: this.rendicion
		});
	}
}