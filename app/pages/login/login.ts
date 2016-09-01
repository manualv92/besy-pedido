import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from './../tabs/tabs';
import {UserService} from './../../services/UserService';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';

@Component({
	templateUrl: 'build/pages/login/login.html',
  directives: REACTIVE_FORM_DIRECTIVES
})
export class LoginPage {

  authForm: FormGroup;
  username: AbstractControl;
  password: AbstractControl;

  constructor(private navCtrl: NavController, private user: UserService) {
    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.username = this.authForm.controls['username'];
    this.password = this.authForm.controls['password'];
  }

  submit(event:Event) {
    event.defaultPrevented;
    /*
    this.user.authenticate(this.username.value, this.password.value).subscribe(
      res => this.user.isLoged = res,
      err => this.alertError(err),
      ()  => this.navCtrl.setRoot(TabsPage)
    );
  */
  this.navCtrl.setRoot(TabsPage);
  }

  alertError(msj) {
    (<FormControl>this.authForm.controls['password']).updateValue('');
    msj.present();
  }

	goToTabs() {
  	// change push to set root
  	this.user.loginObservable().subscribe(
  		res => console.log(res),
  		err => console.log(err),
  		() => this.navCtrl.setRoot(TabsPage)
  	);
  }
}
