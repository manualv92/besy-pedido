import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {RendicionPage} from '../rendicion/rendicion';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {UserService} from './../../services/UserService';
import {RechazoPage} from '../rechazo/rechazo';

@Component({
	templateUrl: 'build/pages/rendiciones2/rendiciones2.html'
})
export class RendicionesPage2 {

	instances;

	evaluar = {
		resultado: 'aprobar',
		comentario: '',
		motivo: ''
	}

	constructor(
		private navCtrl: NavController,
		private loading: LoadingController,
		private user: UserService,
		private http: ExtendedHttp) {
	}

	ionViewWillEnter() {
		let load = this.loading.create();
		load.present();

		this.http.get('/api/instance2').subscribe(
			res => this.formatData(res.json()),
			err => console.log(err),
			() => load.dismiss()
		);
	}

	goToRendicion(rendicion) {
		this.navCtrl.push(RendicionPage, {
			rendicion: rendicion
		});
	}

	goToRechazo(rendicion) {
		this.navCtrl.push(RechazoPage, {
			rendicion: rendicion
		});
	}

	evaluate(rendicion) {
		let load = this.loading.create();
		load.present();
		console.log(rendicion.id);
		this.http.post('/api/instance/' + rendicion.id + '/evaluate', { "evaluar": this.evaluar }).subscribe(
			res => load.dismiss(),
			err => console.log(err),
			()  => this.popToRootFix()
		);
	}

	// workarround for ionic bugs in NavController - LoadingController
	private popToRootFix() {
		setTimeout(() => this.ionViewWillEnter(), 500)
	}

	formatData(data) {
		let last = {
			anio: null,
			mes: null,
			dia: null
		};

		data.map( instance => {
			console.log(instance.id);
			instance.data = JSON.parse(instance.data);
			if (instance.data.length > 1) instance.montoTotal = instance.data.reduce((a, b) => a + b.monto, 0);
			else if(instance.data[0]) instance.montoTotal = instance.data[0].monto;

			instance.receptionTime = new Date(instance.receptionTime);
			instance.receptionTime.get
			if (
				last.anio == instance.receptionTime.getYear() &&
				last.mes == instance.receptionTime.getMonth() &&
				last.dia == instance.receptionTime.getDay() ) {
				instance.print = false;
			} else {
				instance.print = true;
			}
			last.anio = instance.receptionTime.getYear();
			last.mes = instance.receptionTime.getMonth();
			last.dia = instance.receptionTime.getDay();


			return instance;
		});
		this.instances = data;
	}
}