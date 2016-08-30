import {Component} from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import {RendicionPage} from '../rendicion/rendicion';
import {ExtendedHttp} from './../../services/ExtendedHttp';
import {UserService} from './../../services/UserService';

@Component({
	templateUrl: 'build/pages/rendiciones/rendiciones.html'
})
export class RendicionesPage {

	processes: any;

	constructor(
		private navCtrl: NavController,
		private loading: LoadingController,
		private user: UserService,
		private http: ExtendedHttp) {
	}

	ionViewWillEnter() {
		let load = this.loading.create();
		load.present();

		this.http.get('/api/instance').subscribe(
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

	formatData(data) {
		//console.log(data);
		let last = {
			anio: null,
			mes: null,
			dia: null
		};

		data.map( x => {
			return x.activities.map( y => {
				return y.instances.map( z => {
					if (
						last.anio == z.recivedDate.anio &&
						last.mes == z.recivedDate.mes &&
						last.dia == z.recivedDate.dia ) {
						z.print = false;
					} else {
						z.print = true;
					}
					last.anio = z.recivedDate.anio;
					last.mes = z.recivedDate.mes;
					last.dia = z.recivedDate.dia;

					if ((<String>z.recivedDate.min).length == 1) z.recivedDate.min = <String>('0' + z.recivedDate.min);
					return z;
				})
			})
		});
		this.processes = data;
	}
}