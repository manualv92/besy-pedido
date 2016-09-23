import {Component} from '@angular/core';
import {Platform, ionicBootstrap, Storage, LocalStorage } from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from './pages/login/login';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { UserService } from './services/UserService';
import { ClientService } from './services/ClientService';
import { ProductService } from './services/ProductService';
import { PedidoService } from './services/PedidoService';
import { ExtendedHttp } from './services/ExtendedHttp';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;
  public local:any;

  constructor(private platform: Platform) {
    this.rootPage = LoginPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }
}

ionicBootstrap(MyApp, [
  disableDeprecatedForms(),
  provideForms(),
  ExtendedHttp,
  UserService,
  ClientService,
  ProductService,
  PedidoService]
 );
