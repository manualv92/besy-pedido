import {Component} from '@angular/core';
import {NavController, LoadingController, NavParams} from 'ionic-angular';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {UserService} from './../../services/UserService';
import {ExtendedHttp} from './../../services/ExtendedHttp';

@Component({
	templateUrl: 'build/pages/rechazo/rechazo.html',
	directives: REACTIVE_FORM_DIRECTIVES
})
export class RechazoPage {

	rendicion: any;
	motivos: any;

	evaluar = {
		resultado: 'rechazar',
		comentario: '',
		motivo: ''
	};

	rejectForm: FormGroup;
	motivo: AbstractControl;
	observacion: AbstractControl;

	constructor(
		private navCtrl: NavController,
		private loading: LoadingController,
		private params: NavParams,
		private http: ExtendedHttp
		) {
		this.rendicion = this.params.get('rendicion');
		this.rejectForm = new FormGroup({
			motivo: new FormControl('', [Validators.required]),
			observacion: new FormControl('', [Validators.required])
		});
		this.motivo = this.rejectForm.controls['motivo'];
		this.observacion = this.rejectForm.controls['observacion'];
	}

	ionViewWillEnter() {
		let load = this.loading.create();
		load.present();

		this.http.get('/api/instance/' + this.rendicion.id + '/motivo-rechazo').subscribe(
			res => this.motivos = res.json().parametros.motivosrechazo,
			err => console.log(err),
			() => load.dismiss()
		);
	}

	submit(event:Event) {
		event.preventDefault();
		this.evaluar.motivo = this.motivo.value;
		this.evaluar.comentario = this.observacion.value;
		console.log(this.evaluar);
		let load = this.loading.create();
		load.present();
		this.http.post('/api/instance/' + this.rendicion.id + '/evaluate', { "evaluar": this.evaluar }).subscribe(
			res => {load.dismiss();console.log(res);},
			err => console.log(err),
			() => this.goBackToRendicionesFix()
		);
	}

	// workarround for ionic bugs in NavController - LoadingController
	private goBackToRendicionesFix() {
		setTimeout(() => this.goBackToRendiciones(), 500);
	}	

	goBackToRendiciones() {
		this.navCtrl.popToRoot();
	}
}